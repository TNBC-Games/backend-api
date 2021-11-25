import IMyTournamentModel from '../models/interfaces/IMyTournamentModel';
import MyTournamentSchema from '../models/schemas/myTournamet.schema';
import BaseRepository from './base/base.repository';

export default class TournamentRepository extends BaseRepository<IMyTournamentModel> {
    constructor() {
        super(MyTournamentSchema);
    }
}
