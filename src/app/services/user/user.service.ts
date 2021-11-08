import { injectable, inject } from 'inversify';
import UserRepository from '../../repository/user.respository';
import { systemResponse } from '../../../utils/response';

@injectable()
export default class UserService {
    private _userRepository: UserRepository;
    private limit: number;

    constructor() {
        this._userRepository = new UserRepository();
        this.limit = 20;
    }

    public async getUser(id: string): Promise<any> {
        return systemResponse(true, 'Registration successfull', { id });
    }
}
