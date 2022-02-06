import ITournamentQueueModel from '../models/interfaces/ITournamentQueueModel';
import TournamentQueueSchema from '../models/schemas/tournamentQueue.schema';
import BaseRepository from './base/base.repository';

export default class TournamentQueueRepository extends BaseRepository<ITournamentQueueModel> {
    constructor() {
        super(TournamentQueueSchema);
    }
}
