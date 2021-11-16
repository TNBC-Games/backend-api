import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import TournamentService from '../services/tournament/tournament.service';
import { ISystemR } from '../../utils/types';

@injectable()
export default class TournamentController {
    constructor() {}
}
