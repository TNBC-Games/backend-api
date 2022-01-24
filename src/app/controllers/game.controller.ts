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

    public async getGame(req: Request, res: Response): Promise<void> {
        const gameService = new GameService();
        let respo: ISystemR = await gameService.getGame(req.params.name);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async getGames(req: Request, res: Response): Promise<void> {
        const gameService = new GameService();
        let respo: ISystemR = await gameService.getGames(req.query);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async searchGames(req: Request, res: Response): Promise<void> {
        const gameService = new GameService();
        let respo: ISystemR = await gameService.searchGames(req.query, req.params.name);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async publishGame(req: Request, res: Response): Promise<void> {
        const gameService = new GameService();
        let respo: ISystemR = await gameService.publishGame(req.params.name, res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async unPublishGame(req: Request, res: Response): Promise<void> {
        const gameService = new GameService();
        let respo: ISystemR = await gameService.unPublishGame(req.params.name, res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async updateGame(req: Request, res: Response): Promise<void> {
        const gameService = new GameService();
        let respo: ISystemR = await gameService.updateGame(req.body, req.params.name, res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async uploadGameImage(req: Request, res: Response): Promise<void> {
        const gameService = new GameService();
        let respo: ISystemR = await gameService.uploadGameImage(req.files, req.params.name);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
