import { injectable, inject } from 'inversify';
import config from '../../../config';
import UserRepository from '../../repository/user.respository';
import EmailCodeRepository from '../../repository/emailCode.repository';
import jwt from 'jsonwebtoken';
import { systemResponse } from '../../../utils/response';
import { CompareString, SignJwt } from './encrpty.service';

type user = {
    email: string;
    password: string;
};

type reg_details = {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
};

@injectable()
export default class AuthService {
    private _userRepository: UserRepository;
    private _emailCodeRepository: EmailCodeRepository;
    private limit: number;

    constructor() {
        this._userRepository = new UserRepository();
        this._emailCodeRepository = new EmailCodeRepository();
        this.limit = 20;
    }

    public async register(body: reg_details, id: any): Promise<any> {
        return systemResponse(true, 'Registration successfull', {});
    }

    public async login(body: user): Promise<any> {
        const { email, password } = body;

        const user = await this._userRepository.findOne({ email });
        if (!user) {
            return systemResponse(false, 'Invalid Email or Password', {});
        }

        const checkPassword = await CompareString(password, user.password);
        if (!checkPassword) {
            return systemResponse(false, 'Invalid Email or Password', {});
        }

        const payload: { user: { id: string } } = {
            user: {
                id: user.id
            }
        };

        const accessToken = SignJwt(payload, config.accessTokenSecret, config.accessTokenExp);
        const refreshToken = SignJwt(payload, config.refreshTokenSecret, config.refreshTokenExp);

        if (!accessToken) {
            return systemResponse(false, 'Token error', {});
        }
        if (!refreshToken) {
            return systemResponse(false, 'Token error', {});
        }

        return systemResponse(true, 'Login Successfull', { accessToken, refreshToken });
    }

    public async refreshToken(body: { refreshToken: string }): Promise<any> {
        const { refreshToken } = body;
        try {
            const payload: any = jwt.verify(refreshToken, config.refreshTokenSecret, { ignoreExpiration: true });
            const newPayload = { user: { id: payload.user.id } };

            const newAccessToken = SignJwt(newPayload, config.accessTokenSecret, config.accessTokenExp);
            const newRefreshToken = SignJwt(newPayload, config.refreshTokenSecret, config.refreshTokenExp);

            if (!newAccessToken) {
                return systemResponse(false, 'Token error', {});
            }
            if (!newRefreshToken) {
                return systemResponse(false, 'Token error', {});
            }

            return systemResponse(true, 'Token refreshed successfully', { accessToken: newAccessToken, refreshToken: newRefreshToken });
        } catch (err: any) {
            return systemResponse(false, err.message, {});
        }
    }
}
