import { injectable, inject } from 'inversify';
import TournamentRepository from '../../repository/tournament.repository';
import { systemResponse } from '../../../utils/response';

@injectable()
export default class AuthService {
    private _tournamentRepository: TournamentRepository;
    private limit: number;

    constructor() {
        this._tournamentRepository = new TournamentRepository();
        this.limit = 20;
    }
}
