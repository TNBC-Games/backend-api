import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import UserService from '../services/user/user.service';
import { ISystemR } from '../../utils/types';

@injectable()
export default class AuthController {
    constructor() {}

    public async getUser(req: Request, res: Response): Promise<void> {
        const authService = new UserService();
        let respo: ISystemR = await authService.getUser(res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
