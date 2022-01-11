import { injectable, inject } from 'inversify';
import UserRepository from '../../repository/user.respository';
import { systemResponse } from '../../../utils/response';
import { Encrypt } from '../auth/encrpty.service';
import { cloudinary } from '../../../cloudinary';
import fs from 'fs';

type user = {
    email: string;
    password: string;
    username: string;
};

@injectable()
export default class UserService {
    private _userRepository: UserRepository;
    private limit: number;

    constructor() {
        this._userRepository = new UserRepository();
        this.limit = 20;
    }

    public async getUser(id: string): Promise<any> {
        const user = await this._userRepository.findById(id, '-password');
        if (!user) {
            return systemResponse(false, 'Invalid User', {});
        }
        return systemResponse(true, '', user);
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
        let { sortBy, page, limit } = query;

        const filters: string[] = ['earnings', 'points', 'gold', 'silver', 'bronze'];
        if (filters.some((filter) => sortBy !== filter)) sortBy === 'earnings';

        const sort: any = {};
        if (sortBy === 'earnings') sort.earnings = -1;
        if (sortBy === 'points') sort.points = -1;
        if (sortBy === 'gold') sort.gold = -1;
        if (sortBy === 'silver') sort.silver = -1;
        if (sortBy === 'bronze') sort.bronze = -1;

        if (!page) page = 1;
        if (!limit) limit = 2;

        page = parseInt(page);
        limit = parseInt(limit);
        const skip = (page - 1) * limit;

        const leaderBoard = await this._userRepository.findWithOptions({}, { limit, skip, sort });
        const nextPage = await this._userRepository.findWithOptions({}, { limit, skip: skip + limit, sort });

        const results = {
            nextPage: nextPage.length !== 0 ? true : false,
            page,
            limit,
            sortBy,
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

        if (Array.isArray(files.avatar)) avatar = files.avatar[0];
        if (!Array.isArray(files.avatar)) avatar = files.avatar;

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
        const updateImage = await this._userRepository.updateById(user.id, update);

        if (!updateImage) {
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
}
