import IGameModel from '../models/interfaces/IGameModel';
import GameSchema from '../models/schemas/game.schema';
import BaseRepository from './base/base.repository';

export default class GameRepository extends BaseRepository<IGameModel> {
    constructor() {
        super(GameSchema);
    }
}
