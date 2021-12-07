import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import AuthService from '../services/auth/auth.service';
import { ISystemR } from '../../utils/types';

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

    public async googleAuth(req: Request, res: Response): Promise<void> {
        const authService = new AuthService();
        let respo: ISystemR = await authService.googleAuth(req);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        let data: any = respo.data;
        res.cookie('accessToken', JSON.stringify(data.accessToken));
        res.cookie('refreshToken', JSON.stringify(data.refreshToken));
        res.writeHead(302, {
            Location: 'http://localhost:3000/'
        });
        return res.end();
    }

    public async discordAuth(req: Request, res: Response): Promise<void> {
        const authService = new AuthService();
        let respo: ISystemR = await authService.discordAuth(req);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }

        let data: any = respo.data;
        res.cookie('accessToken', JSON.stringify(data.accessToken));
        res.cookie('refreshToken', JSON.stringify(data.refreshToken));
        res.writeHead(302, {
            Location: 'http://localhost:3000/'
        });
        return res.end();
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
