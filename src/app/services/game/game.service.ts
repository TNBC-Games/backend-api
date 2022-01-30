import { injectable, inject } from 'inversify';
import GameRepository from '../../repository/game.repository';
import UserRepository from '../../repository/user.respository';
import TournamenRepository from '../../repository/tournament.repository';
import { systemResponse } from '../../../utils/response';
import mongoose from 'mongoose';
import { cloudinary } from '../../../cloudinary';
import fs from 'fs';

type game = {
    name: string;
    mainCategory: string;
    categories: { category: string }[];
};

@injectable()
export default class AuthService {
    private _gameRepository: GameRepository;
    private _userRepository: UserRepository;
    private _tournamentRepository: TournamenRepository;
    private limit: number;

    constructor() {
        this._gameRepository = new GameRepository();
        this._userRepository = new UserRepository();
        this._tournamentRepository = new TournamenRepository();
        this.limit = 20;
    }

    public async addGame(body: game, id: string): Promise<any> {
        const { name } = body;

        const user = await this._userRepository.findById(id);
        if (!user) {
            return systemResponse(false, 'Invalid User', {});
        }

        const checkName = await this._gameRepository.findOne({ name: name.toLocaleUpperCase() });
        if (checkName) {
            return systemResponse(false, 'Name already used', {});
        }

        const game = await this._gameRepository.create({ ...body, name: name.toLocaleUpperCase() });
        if (!game) {
            return systemResponse(false, 'Error in creating game', {});
        }

        return systemResponse(true, 'Game added', {});
    }

    public async getGame(name: string): Promise<any> {
        const game = await this._gameRepository.findOne({ name: name.toLocaleUpperCase(), published: true });
        if (!game) {
            return systemResponse(false, 'Invalid game', {});
        }

        const tournaments = await this._tournamentRepository.find({ game: game.id });
        const result = { ...game._doc, tournaments };

        return systemResponse(true, '', result);
    }

    public async getGames(query: any): Promise<any> {
        let { page, limit } = query;

        if (!page) page = 1;
        if (!limit) limit = 2;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const games = await this._gameRepository.findWithOptions({ published: true }, { limit, skip });
        const nextPage = await this._gameRepository.findWithOptions({ published: true }, { limit, skip: skip + limit });

        const data = { nextPage: nextPage.length !== 0 ? true : false, page, limit, games };

        return systemResponse(true, '', data);
    }

    public async getUnpublishedGames(query: any): Promise<any> {
        let { page, limit } = query;

        if (!page) page = 1;
        if (!limit) limit = 2;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const games = await this._gameRepository.findWithOptions({ published: false }, { limit, skip });
        const nextPage = await this._gameRepository.findWithOptions({ published: false }, { limit, skip: skip + limit });

        const data = { nextPage: nextPage.length !== 0 ? true : false, page, limit, games };

        return systemResponse(true, '', data);
    }

    public async searchGames(query: any, name: string): Promise<any> {
        let { page, limit } = query;

        if (!page) page = 1;
        if (!limit) limit = 2;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const results = await this._gameRepository.findWithOptions({ name: { $regex: name, $options: 'i' }, published: true }, { limit, skip });
        const nextPage = await this._gameRepository.findWithOptions({ name: { $regex: name, $options: 'i' }, published: true }, { limit, skip: skip + limit });

        const data = { nextPage: nextPage.length !== 0 ? true : false, page, limit, results };

        return systemResponse(true, 'Search games', data);
    }

    public async publishGame(name: string, id: string): Promise<any> {
        const game = await this._gameRepository.findOne({ name: name.toLocaleUpperCase() });
        if (!game) {
            return systemResponse(false, 'Invalid game', {});
        }

        if (game.published) {
            return systemResponse(false, 'Game is already published', {});
        }

        const update = await this._gameRepository.updateById(game.id, { published: true });
        if (!update) {
            return systemResponse(false, 'Error while publishing', {});
        }

        const getGame = await this._gameRepository.findOne({ name: name.toLocaleUpperCase() });

        return systemResponse(true, 'Game published', getGame);
    }

    public async unPublishGame(name: string, id: string): Promise<any> {
        const game = await this._gameRepository.findOne({ name: name.toLocaleUpperCase() });
        if (!game) {
            return systemResponse(false, 'Invalid game', {});
        }

        if (!game.published) {
            return systemResponse(false, 'Game is not published', {});
        }

        const update = await this._gameRepository.updateById(game.id, { published: false });
        if (!update) {
            return systemResponse(false, 'Error while publishing', {});
        }

        const getGame = await this._gameRepository.findOne({ name: name.toLocaleUpperCase() });

        return systemResponse(true, 'Game unpublished', getGame);
    }

    public async updateGame(body: game, _name: string, id: string): Promise<any> {
        let { name } = body;
        _name = _name.toLocaleUpperCase();

        const user = await this._userRepository.findById(id);
        if (!user) {
            return systemResponse(false, 'Invalid User', {});
        }

        const game = await this._gameRepository.findOne({ name: _name });
        if (!game) {
            return systemResponse(false, 'Invalid game', {});
        }

        if (name) {
            const checkName = await this._gameRepository.findOne({ $and: [{ name: name.toLocaleUpperCase() }, { _id: { $not: { $eq: game.id } } }] });
            if (checkName) {
                return systemResponse(false, 'Name already used', {});
            }

            body.name = name.toLocaleUpperCase();
        }

        const update = await this._gameRepository.updateOne({ name: _name }, body);
        if (!update) {
            return systemResponse(false, 'Error while updating game', {});
        }

        return systemResponse(true, 'Game updated', {});
    }

    public async uploadGameImage(files: any, name: string): Promise<any> {
        let image: any;
        let _name = name.toLocaleUpperCase();

        const game = await this._gameRepository.findOne({ name: _name });
        if (!game) {
            return systemResponse(false, 'Invalid game', {});
        }

        if (Array.isArray(files.image)) image = files.image[0];
        if (!Array.isArray(files.image)) image = files.image;

        if (game.cloudinaryId) {
            await cloudinary.uploader.destroy(game.cloudinaryId);
        }

        const upload = await cloudinary.uploader.upload(image.tempFilePath);

        if (!upload) {
            //delete temp image
            fs.unlink(image.tempFilePath, async (err) => {
                if (err) throw err;
            });
            return systemResponse(false, 'Something went wrong while uploading image', {});
        }

        //delete temp image
        fs.unlink(image.tempFilePath, async (err) => {
            if (err) throw err;
        });

        const update = {
            image: upload.url,
            cloudinaryId: upload.public_id
        };
        const updateImage = await this._gameRepository.updateById(game.id, update);

        if (!updateImage) {
            return systemResponse(false, 'Something went wrong while uploading image', {});
        }

        const getGame = await this._gameRepository.findOne({ name: _name });

        return systemResponse(true, 'Game', getGame);
    }
}
