import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import UserService from '../services/user/user.service';
import { ISystemR } from '../../utils/types';

@injectable()
export default class UserController {
    constructor() {}

    public async getUser(req: Request, res: Response): Promise<void> {
        const userService = new UserService();
        let respo: ISystemR = await userService.getUser(res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const userService = new UserService();
        let respo: ISystemR = await userService.updateUser(req.body, res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async uploadAvatar(req: Request, res: Response): Promise<void> {
        const userService = new UserService();
        let respo: ISystemR = await userService.uploadAvatar(req.files, res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async removeAvatar(req: Request, res: Response): Promise<void> {
        const userService = new UserService();
        let respo: ISystemR = await userService.removeAvatar(res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async getLeaderBoard(req: Request, res: Response): Promise<void> {
        const userService = new UserService();
        let respo: ISystemR = await userService.getLeaderBoard(req.query);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
