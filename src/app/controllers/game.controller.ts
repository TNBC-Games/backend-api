import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import GameService from '../services/game/game.service';
import { ISystemR } from '../../utils/types';

@injectable()
export default class GameController {
    constructor() {}

    public async addGame(req: Request, res: Response): Promise<void> {
        const gameService = new GameService();
        let respo: ISystemR = await gameService.addGame(req.body, res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
