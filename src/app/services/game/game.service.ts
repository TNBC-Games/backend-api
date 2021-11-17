import { injectable, inject } from 'inversify';
import GameRepository from '../../repository/game.repository';
import UserRepository from '../../repository/user.respository';
import { systemResponse } from '../../../utils/response';

type game = {
    name: string;
    mainCategpry: string;
    categories: { category: string }[];
};

@injectable()
export default class AuthService {
    private _gameRepository: GameRepository;
    private _userRepository: UserRepository;
    private limit: number;

    constructor() {
        this._gameRepository = new GameRepository();
        this._userRepository = new UserRepository();
        this.limit = 20;
    }

    public async addGame(body: game, id: string): Promise<any> {
        const user = await this._userRepository.findById(id);
        if (!user) {
            return systemResponse(false, 'Invalid User', {});
        }

        if (!user.admin) {
            return systemResponse(false, 'Route only accessible to admins', {});
        }

        return systemResponse(true, 'Add Game', user);
    }
}
