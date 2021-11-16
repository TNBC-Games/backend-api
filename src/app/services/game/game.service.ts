import { injectable, inject } from 'inversify';
import GameRepository from '../../repository/game.repository';
import { systemResponse } from '../../../utils/response';

@injectable()
export default class AuthService {
    private _gameRepository: GameRepository;
    private limit: number;

    constructor() {
        this._gameRepository = new GameRepository();
        this.limit = 20;
    }
}
