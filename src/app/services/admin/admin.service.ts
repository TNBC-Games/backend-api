import { injectable, inject } from 'inversify';
import UserRepository from '../../repository/user.respository';
import { systemResponse } from '../../../utils/response';
import { Encrypt } from '../auth/encrpty.service';

type user = {
    username: string;
    email: string;
    password: string;
};

@injectable()
export default class AuthService {
    private _userRepository: UserRepository;
    private limit: number;

    constructor() {
        this._userRepository = new UserRepository();
        this.limit = 20;
    }

    public async createAdmin(userData: user): Promise<any> {
        const { username, email, password } = userData;

        const checkUsername = await this._userRepository.findOne({ username });
        if (checkUsername) {
            return systemResponse(false, 'Username already exists', {});
        }

        const checkEmail = await this._userRepository.findOne({ email: email.toLocaleLowerCase() });
        if (checkEmail) {
            return systemResponse(false, 'Email already exists', {});
        }

        const _password = await Encrypt(password);
        const user = { username, email, password: _password, admin: true };

        const createUser = await this._userRepository.create(user);
        if (!createUser) {
            return systemResponse(false, 'Error while creating admin', {});
        }

        return systemResponse(true, 'Admin created successfully', {});
    }

    public async getAdmins(): Promise<any> {
        const admins = await this._userRepository.find({ admin: true }, '-password');
        if (!admins) {
            return systemResponse(false, 'Error while getting admins', {});
        }

        return systemResponse(true, '', admins);
    }
}
