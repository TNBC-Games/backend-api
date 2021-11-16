import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import GameService from '../services/game/game.service';
import { ISystemR } from '../../utils/types';

@injectable()
export default class GameController {
    constructor() {}
}
