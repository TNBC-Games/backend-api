import { injectable, inject } from 'inversify';
import config from '../../../config';
import UserRepository from '../../repository/user.respository';
import EmailCodeRepository from '../../repository/emailCode.repository';
import jwt from 'jsonwebtoken';
import { systemResponse } from '../../../utils/response';
import { CompareString, Encrypt, SignJwt } from './encrpty.service';

type user = {
    username: string;
    email: string;
    password: string;
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

    public async register(body: user): Promise<any> {
        const { username, email, password } = body;

        const checkEmail = await this._userRepository.findOne({ email: email.toLocaleLowerCase(), oauth: false });
        if (checkEmail) {
            return systemResponse(false, 'Email already exists', {});
        }

        const checkUsername = await this._userRepository.findOne({ username });
        if (checkUsername) {
            return systemResponse(false, 'Username already exists', {});
        }

        const _password = await Encrypt(password);
        const user = { username, email: email.toLocaleLowerCase(), password: _password };

        const newUser = await this._userRepository.create(user);
        if (!newUser) {
            return systemResponse(false, 'Registration error', {});
        }

        const getUser = await this._userRepository.findOne({ email: email.toLocaleLowerCase(), oauth: false }, '-password');
        const payload: { user: { id: string } } = {
            user: {
                id: getUser.id
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

        return systemResponse(true, 'Registration successfull', { accessToken, refreshToken, user: getUser });
    }

    public async login(body: user): Promise<any> {
        const { email, password } = body;

        const user = await this._userRepository.findOne({ email: email.toLocaleLowerCase(), oauth: false });
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

        const getUser = await this._userRepository.findOne({ email: email.toLocaleLowerCase(), oauth: false }, '-password');

        if (!accessToken) {
            return systemResponse(false, 'Token error', { accessToken, refreshToken, getUser });
        }
        if (!refreshToken) {
            return systemResponse(false, 'Token error', {});
        }

        return systemResponse(true, 'Login Successfull', { accessToken, refreshToken, user });
    }

    public async Oauth(req: any): Promise<any> {
        if (!req.user) {
            return systemResponse(false, 'Unauthenticated', {});
        }

        const { _id } = req.user;

        const payload: { user: { id: string } } = {
            user: {
                id: _id
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

        return systemResponse(true, 'Google authentication successfull', { accessToken, refreshToken, user: req.user });
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
