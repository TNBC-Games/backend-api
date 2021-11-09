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
        const user = await this._userRepository.findById(id, '-password');
        if (!user) {
            return systemResponse(false, 'Invalid User', {});
        }
        return systemResponse(true, '', user);
    }

    public async updateUser(id: string): Promise<any> {
        return systemResponse(true, '', {});
    }
}
