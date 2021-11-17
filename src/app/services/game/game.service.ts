import { injectable, inject } from 'inversify';
import GameRepository from '../../repository/game.repository';
import { systemResponse } from '../../../utils/response';

type game = {
    name: string;
    mainCategory: string;
    categories: { category: string }[];
};

@injectable()
export default class AuthService {
    private _gameRepository: GameRepository;
    private limit: number;

    constructor() {
        this._gameRepository = new GameRepository();
        this.limit = 20;
    }

    public async addGame(body: game, id: string): Promise<any> {
        return systemResponse(true, 'Add game', { id });
    }
}
