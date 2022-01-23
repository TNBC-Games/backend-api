import { injectable, inject } from 'inversify';
import UserRepository from '../../repository/user.respository';
import UserRecordRepository from '../../repository/userRecord.repository';
import { systemResponse } from '../../../utils/response';
import { Encrypt } from '../auth/encrpty.service';
import { cloudinary } from '../../../cloudinary';
import fs from 'fs';
import mongoose from 'mongoose';

type user = {
    email: string;
    password: string;
    username: string;
};

@injectable()
export default class UserService {
    private _userRepository: UserRepository;
    private _userRecordRepository: UserRecordRepository;
    private limit: number;

    constructor() {
        this._userRepository = new UserRepository();
        this._userRecordRepository = new UserRecordRepository();
        this.limit = 20;
    }

    public async getUser(id: string): Promise<any> {
        const user = await this._userRepository.findById(id, '-password');
        if (!user) {
            return systemResponse(false, 'Invalid User', {});
        }

        const getRecords = await this._userRecordRepository.aggregate([
            { $group: { _id: '$user', points: { $sum: '$points' }, earnings: { $sum: '$earnings' }, gold: { $sum: '$gold' }, silver: { $sum: '$silver' }, bronze: { $sum: '$bronze' } } }
        ]);

        const userEarnings = getRecords.find((record: any) => record._id.toString() === user.id.toString());

        return systemResponse(true, '', { user: { ...user._doc, userEarnings } });
    }

    public async updateUser(body: user, id: string): Promise<any> {
        const { username, email, password } = body;
        const update: any = {};

        const user = await this._userRepository.findById(id);
        if (!user) {
            return systemResponse(false, 'Invalid user', {});
        }

        if (username) {
            const checkUsername = await this._userRepository.findOne({ $and: [{ username }, { _id: { $not: { $eq: user.id } } }] });
            if (checkUsername) {
                return systemResponse(false, 'Username already exists', {});
            }
            update.username = username;
        }

        if (email) {
            const checkEmail = await this._userRepository.findOne({ $and: [{ email }, { _id: { $not: { $eq: user.id } } }] });
            if (checkEmail) {
                return systemResponse(false, 'Email already exists', {});
            }
            update.email = email;
        }

        if (password) {
            const _password = Encrypt(password);
            update.password = _password;
        }

        const updateUser = await this._userRepository.updateById(user.id, update);
        if (!updateUser) {
            return systemResponse(false, 'Error while updating user', {});
        }

        const getUser = await this._userRepository.findById(user.id, '-password');
        if (!updateUser) {
            return systemResponse(false, 'Error in rettrieving user data', {});
        }

        return systemResponse(true, 'Update Successfull', getUser);
    }

    public async getLeaderBoard(query: any): Promise<any> {
        let { sortBy, page, limit, game, timeSpan } = query;
        let time: any = new Date('December 17, 1895 00:00:00');
        game = game ? game.toLocaleUpperCase() : '';

        const filters: string[] = ['earnings', 'points', 'gold', 'silver', 'bronze'];
        if (filters.some((filter) => sortBy !== filter)) sortBy === 'earnings';

        if (timeSpan === '7days') time = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        if (timeSpan === '30days') time = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000);

        const sort: any = {};
        if (sortBy === 'earnings') sort.earnings = -1;
        if (sortBy === 'points') sort.points = -1;
        if (sortBy === 'gold') sort.gold = -1;
        if (sortBy === 'silver') sort.silver = -1;
        if (sortBy === 'bronze') sort.bronze = -1;

        let match: any = { createdAt: { $gte: time } };

        if (game || game.trim() !== '') {
            match = { $and: [{ createdAt: { $gte: time } }, { game: { $eq: game } }] };
        }

        if (!page) page = 1;
        if (!limit) limit = 10;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const leaderBoard = await this._userRecordRepository.aggregate([
            { $match: match },
            { $group: { _id: '$user', points: { $sum: '$points' }, earnings: { $sum: '$earnings' }, gold: { $sum: '$gold' }, silver: { $sum: '$silver' }, bronze: { $sum: '$bronze' } } },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit }
        ]);

        const nextPage = await this._userRecordRepository.aggregate([
            { $match: match },
            { $group: { _id: '$user', points: { $sum: '$points' }, earnings: { $sum: '$earnings' }, gold: { $sum: '$gold' }, silver: { $sum: '$silver' }, bronze: { $sum: '$bronze' } } },
            { $sort: sort },
            { $skip: skip + limit },
            { $limit: limit }
        ]);

        const results = {
            nextPage: nextPage.length !== 0 ? true : false,
            page,
            limit,
            sortedBy: sortBy,
            timeSpan: timeSpan === '7days' ? '7days' : timeSpan === '30days' ? '30days' : 'All Time',
            game: game.trim() === '' ? 'All games' : game,
            leaderBoard
        };

        return systemResponse(true, 'Get LeaderBoard', results);
    }

    public async uploadAvatar(files: any, id: string): Promise<any> {
        let avatar: any;

        const user = await this._userRepository.findById(id);
        if (!user) {
            return systemResponse(false, 'Invalid user', {});
        }

        if (Array.isArray(files.image)) avatar = files.image[0];
        if (!Array.isArray(files.image)) avatar = files.image;

        if (user.cloudinaryId) {
            await cloudinary.uploader.destroy(user.cloudinaryId);
        }

        const upload = await cloudinary.uploader.upload(avatar.tempFilePath);

        if (!upload) {
            //delete temp image
            fs.unlink(avatar.tempFilePath, async (err) => {
                if (err) throw err;
            });
            return systemResponse(false, 'Something went wrong while uploading avatar', {});
        }

        //delete temp image
        fs.unlink(avatar.tempFilePath, async (err) => {
            if (err) throw err;
        });

        const update = {
            avatar: upload.url,
            cloudinaryId: upload.public_id
        };
        const updateAvatar = await this._userRepository.updateById(user.id, update);

        if (!updateAvatar) {
            return systemResponse(false, 'Something went wrong while uploading avatar', {});
        }

        const getUser = await this._userRepository.findById(id);

        return systemResponse(true, 'Success', getUser);
    }

    public async removeAvatar(id: string): Promise<any> {
        const user = await this._userRepository.findById(id);
        if (!user) {
            return systemResponse(false, 'Invalid user', {});
        }

        if (user.cloudinaryId) {
            await cloudinary.uploader.destroy(user.cloudinaryId);
        }

        const update = {
            avatar: null,
            cloudinaryId: null
        };
        const updateImage = await this._userRepository.updateById(user.id, update);

        if (!updateImage) {
            return systemResponse(false, 'Something went wrong while deleting avatar', {});
        }

        const getUser = await this._userRepository.findById(id);

        return systemResponse(true, 'Avatar deleted successfully', getUser);
    }

    public async getUserProfile(id: string): Promise<any> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return systemResponse(false, 'Invalid user', {});
        }

        const user = await this._userRepository.findById(id, '-password -cloudinaryId');
        if (!user) {
            return systemResponse(false, 'Invalid user', {});
        }

        const getRecords = await this._userRecordRepository.aggregate([
            { $group: { _id: '$user', points: { $sum: '$points' }, earnings: { $sum: '$earnings' }, gold: { $sum: '$gold' }, silver: { $sum: '$silver' }, bronze: { $sum: '$bronze' } } }
        ]);

        const userEarnings = getRecords.find((record: any) => record._id.toString() === user.id.toString());

        return systemResponse(true, '', { user: { ...user._doc, userEarnings } });
    }
}
