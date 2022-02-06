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

    public async getTournament(req: Request, res: Response): Promise<void> {
        const tournamentService = new TournamentService();
        let respo: ISystemR = await tournamentService.getTournament(req.params.id, req.query);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async getMyTournaments(req: Request, res: Response): Promise<void> {
        const tournamentService = new TournamentService();
        let respo: ISystemR = await tournamentService.getMyTournaments(res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async enterTournament(req: Request, res: Response): Promise<void> {
        const tournamentService = new TournamentService();
        let respo: ISystemR = await tournamentService.enterTournament(req.params.id, res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async updateTournament(req: Request, res: Response): Promise<void> {
        const tournamentService = new TournamentService();
        let respo: ISystemR = await tournamentService.updateTournament(req.body, req.params.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async deleteTournament(req: Request, res: Response): Promise<void> {
        const tournamentService = new TournamentService();
        let respo: ISystemR = await tournamentService.deleteTournament(res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async uploadTournamentImage(req: Request, res: Response): Promise<void> {
        const tournamentService = new TournamentService();
        let respo: ISystemR = await tournamentService.uploadTournamentImage(req.files, req.params.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
