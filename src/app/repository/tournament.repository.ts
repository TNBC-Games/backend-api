import ITournamentModel from '../models/interfaces/ITournamentModel';
import TournamentSchema from '../models/schemas/tournament.schema';
import BaseRepository from './base/base.repository';

export default class TournamentRepository extends BaseRepository<ITournamentModel> {
    constructor() {
        super(TournamentSchema);
    }
}
