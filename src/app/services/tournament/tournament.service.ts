import { injectable, inject } from 'inversify';
import TournamentRepository from '../../repository/tournament.repository';
import TournamentQueueRepository from '../../repository/tournamentQueue.repository';
import GameRepository from '../../repository/game.repository';
import UserRepository from '../../repository/user.respository';
import MyTournamentRepository from '../../repository/myTournaments.repository';
import { systemResponse } from '../../../utils/response';
import mongoose from 'mongoose';
import { cloudinary } from '../../../cloudinary';
import fs from 'fs';

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
    private _tournamentQueueRepository: TournamentQueueRepository;
    private _myTournamentRepository: MyTournamentRepository;
    private _gameRepository: GameRepository;
    private _userRepository: UserRepository;
    private limit: number;

    constructor() {
        this._tournamentRepository = new TournamentRepository();
        this._tournamentQueueRepository = new TournamentQueueRepository();
        this._myTournamentRepository = new MyTournamentRepository();
        this._gameRepository = new GameRepository();
        this._userRepository = new UserRepository();
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

        return systemResponse(true, '', data);
    }

    public async enterTournament(tId: string, id: string): Promise<any> {
        const user = await this._userRepository.findById(id);
        if (!user) {
            return systemResponse(false, 'Invalid User', {});
        }

        if (!mongoose.Types.ObjectId.isValid(tId)) {
            return systemResponse(false, 'Invalid tournament id', {});
        }

        const tournament = await this._tournamentRepository.findById(tId);
        if (!tournament) {
            return systemResponse(false, 'Invalid tournament', {});
        }

        const tournamentPlayers = await this._myTournamentRepository.find({ tournament: tournament.id });
        if (tournamentPlayers.length === tournament.limit) {
            return systemResponse(false, 'Tournament is full', {});
        }

        const checkQueue = await this._tournamentQueueRepository.findOne({ user: user.id, tournament: tournament.id });
        if (checkQueue && checkQueue.status === 'in queue') {
            return systemResponse(false, 'User in queue', {});
        }

        if (checkQueue && checkQueue.status === 'settled') {
            return systemResponse(false, 'Tournament is full', {});
        }

        const data = {
            user: user.id,
            tournament: tournament.id,
            status: 'in queue'
        };

        const addToQueue = await this._tournamentQueueRepository.create(data);
        if (!addToQueue) {
            return systemResponse(false, 'Error while adding user to queue', {});
        }

        return systemResponse(true, 'User added to queue', {});
    }

    public async addUsersToTournaments(): Promise<any> {
        const queues = await this._tournamentQueueRepository.find({ status: 'in queue' });
        let count = 0;

        const addUser = async () => {
            const tournament = await this._tournamentRepository.findById(queues[count].tournament);
            const tournamentPlayers = await this._myTournamentRepository.find({ tournament: queues[count].tournament });
            const checkUser = await this._myTournamentRepository.findOne({ user: queues[count].user, tournament: queues[count].tournament });

            console.log(tournamentPlayers, '---', tournament.limit);

            if (!checkUser && tournament && tournamentPlayers.length < tournament.limit) {
                const data = {
                    user: queues[count].user,
                    tournament: queues[count].tournament
                };
                await this._myTournamentRepository.create(data);
            }

            await this._tournamentQueueRepository.updateById(queues[count].id, { status: 'settled' });
            count++;
            if (count < queues.length) addUser();
        };

        if (queues.length > 0) {
            addUser();
        }
    }

    public async getTournament(id: string, query: any): Promise<any> {
        const { user } = query;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return systemResponse(false, 'Invalid tournament id', {});
        }

        const checkTournament = await this._myTournamentRepository.findOne({ user, tournament: id });
        const checkQueue = await this._tournamentQueueRepository.findOne({ user, tournament: id });

        const tournament = await this._tournamentRepository.findById(id);
        if (!tournament) {
            return systemResponse(false, 'Invalid tournament', {});
        }

        const userStatus = {
            inQueue: !checkQueue ? false : checkQueue && checkQueue.status === 'in queue' ? true : false,
            inTournament: checkTournament ? true : false
        };

        return systemResponse(true, '', { ...tournament._doc, userStatus });
    }

    public async getMyTournaments(id: string): Promise<any> {
        const user = await this._userRepository.findById(id);
        if (!user) {
            return systemResponse(false, 'User Invalid', {});
        }

        const myTournaments = await this._myTournamentRepository.find({ user: user.id });
        if (!myTournaments) {
            return systemResponse(false, 'Error while getting your tournaments', {});
        }

        const getTournamentInfo = myTournaments.map(async (val: any) => {
            const tournament = await this._tournamentRepository.findById(val.tournament);
            return { ...val._doc, tournamentInfo: tournament };
        });

        let results: [] = [];
        await Promise.all(getTournamentInfo)
            .then((res: any) => {
                results = res;
            })
            .catch((err: any) => systemResponse(true, err.message, {}));

        return systemResponse(true, '', results);
    }

    public async updateTournament(body: details, id: string): Promise<any> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return systemResponse(false, 'Invalid tournament id', {});
        }

        const tournament = await this._tournamentRepository.findById(id);
        if (!tournament) {
            return systemResponse(false, 'Invalid tournament', {});
        }

        const updateTournament = await this._tournamentRepository.updateById(tournament.id, body);
        if (!updateTournament) {
            return systemResponse(false, 'Error while updating tournament', {});
        }

        return systemResponse(true, 'Tournament Updated', {});
    }

    public async deleteTournament(id: string): Promise<any> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return systemResponse(false, 'Invalid tournament id', {});
        }

        const tournament = await this._tournamentRepository.findById(id);
        if (!tournament) {
            return systemResponse(false, 'Invalid tournament', {});
        }

        const deleteTournament = await this._tournamentRepository.delete(tournament.id);
        if (!deleteTournament) {
            return systemResponse(false, 'Error while deleting tournament', {});
        }

        return systemResponse(true, 'Tournament Deleted', {});
    }

    public async uploadTournamentImage(files: any, id: string): Promise<any> {
        let image: any;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return systemResponse(false, 'Invalid tournament id', {});
        }

        const tournament = await this._tournamentRepository.findById(id);
        if (!tournament) {
            return systemResponse(false, 'Invalid tournament', {});
        }

        if (Array.isArray(files.image)) image = files.image[0];
        if (!Array.isArray(files.image)) image = files.image;

        if (tournament.cloudinaryId) {
            await cloudinary.uploader.destroy(tournament.cloudinaryId);
        }

        const upload = await cloudinary.uploader.upload(image.tempFilePath);

        if (!upload) {
            //delete temp image
            fs.unlink(image.tempFilePath, async (err) => {
                if (err) throw err;
            });
            return systemResponse(false, 'Something went wrong while uploading avatar', {});
        }

        //delete temp image
        fs.unlink(image.tempFilePath, async (err) => {
            if (err) throw err;
        });

        const update = {
            image: upload.url,
            cloudinaryId: upload.public_id
        };
        const updateImage = await this._tournamentRepository.updateById(tournament.id, update);

        if (!updateImage) {
            return systemResponse(false, 'Something went wrong while uploading image', {});
        }

        const getTournament = await this._tournamentRepository.findById(id);

        return systemResponse(true, 'Image uploaded', getTournament);
    }
}
