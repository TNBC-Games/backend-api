import { injectable, inject } from 'inversify';
import TournamentRepository from '../../repository/tournament.repository';
import GameRepository from '../../repository/game.repository';
import { systemResponse } from '../../../utils/response';

type details = {
    name: string;
    prize: number;
    fee: number;
    limit: number;
    startDate: string;
    info: string;
    type: string;
    game: string;
    rules?: string;
    howToApply?: string;
};

@injectable()
export default class AuthService {
    private _tournamentRepository: TournamentRepository;
    private _gameRepository: GameRepository;
    private limit: number;

    constructor() {
        this._tournamentRepository = new TournamentRepository();
        this._gameRepository = new GameRepository();
        this.limit = 20;
    }

    public async createTournament(body: details, creator: string): Promise<any> {
        const { game } = body;

        const checkGame = await this._gameRepository.findById(game);
        if (!checkGame) {
            return systemResponse(false, 'Invalid Game', {});
        }

        const tournament = await this._tournamentRepository.create({ ...body, creator });
        if (!tournament) {
            return systemResponse(false, 'Error while creating tournament', {});
        }

        return systemResponse(true, 'Tournament created', {});
    }

    public async getTournaments(query: any): Promise<any> {
        let { page, limit } = query;

        if (!page) page = 1;
        if (!limit) limit = 2;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const touenaments = await this._tournamentRepository.findWithOptions({}, { limit, skip });
        const nextPage = await this._tournamentRepository.findWithOptions({}, { limit, skip: skip + limit });

        const getGameInfo = touenaments.map(async (val: any) => {
            const game = await this._gameRepository.findById(val.game);
            return { ...val._doc, game };
        });

        let data = {};
        await Promise.all(getGameInfo)
            .then((results) => {
                data = { nextPage: nextPage.length !== 0 ? true : false, page, limit, results };
            })
            .catch((err) => systemResponse(true, err.message, {}));

        return systemResponse(true, 'Get Tournaments', data);
    }
}
