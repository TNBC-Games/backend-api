import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import AdminService from '../services/admin/admin.service';
import { ISystemR } from '../../utils/types';

@injectable()
export default class AdminController {
    constructor() {}

    public async createAdmin(req: Request, res: Response): Promise<void> {
        const adminService = new AdminService();
        let respo: ISystemR = await adminService.createAdmin(req.body);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async getAdmins(req: Request, res: Response): Promise<void> {
        const adminService = new AdminService();
        let respo: ISystemR = await adminService.getAdmins();
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
