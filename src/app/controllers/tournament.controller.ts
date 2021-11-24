import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import TournamentService from '../services/tournament/tournament.service';
import { ISystemR } from '../../utils/types';

@injectable()
export default class TournamentController {
    constructor() {}

    public async createTournament(req: Request, res: Response): Promise<void> {
        const tournamentService = new TournamentService();
        let respo: ISystemR = await tournamentService.createTournament(req.body, res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async getTournaments(req: Request, res: Response): Promise<void> {
        const tournamentService = new TournamentService();
        let respo: ISystemR = await tournamentService.getTournaments(req.query);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
