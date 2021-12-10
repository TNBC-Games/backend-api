import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import AuthService from '../services/auth/auth.service';
import { ISystemR } from '../../utils/types';
import { rmSync } from 'fs';

@injectable()
export default class AuthController {
    constructor() {}

    public async register(req: Request, res: Response): Promise<void> {
        const authService = new AuthService();
        let respo: ISystemR = await authService.register(req.body);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async login(req: Request, res: Response): Promise<void> {
        const authService = new AuthService();
        let respo: ISystemR = await authService.login(req.body);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    // public async redirectUser(req: Request, res: Response): Promise<void> {
    //     return res.redirect(`http://localhost:3000/`);
    // }

    public async Oauth(req: Request, res: Response): Promise<void> {
        const authService = new AuthService();
        let respo: ISystemR = await authService.Oauth(req);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        const data: any = respo.data;
        return res.redirect(`http://localhost:3000/?accessToken=${data.accessToken}?refreshToken=${data.refreshToken}`);
    }

    public async refreshToken(req: Request, res: Response): Promise<void> {
        const authService = new AuthService();
        let respo: ISystemR = await authService.refreshToken(req.body);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
