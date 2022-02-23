import { injectable, inject } from 'inversify';
import { Request, Response } from 'express';
import { jsonFailed, jsonSuccess } from '../../utils/response';
import TransactionService from '../services/transaction/transaction.service';
import { ISystemR } from '../../utils/types';

@injectable()
export default class TransactionController {
    constructor() {}

    public async validateTransaction(req: Request, res: Response): Promise<void> {
        const transactionService = new TransactionService();
        let respo: ISystemR = await transactionService.validateTransaction();
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }

    public async getTransactionDetails(req: Request, res: Response): Promise<void> {
        const transactionService = new TransactionService();
        let respo: ISystemR = await transactionService.getTransactionDetails(res.locals.id);
        if (!respo.success) {
            return jsonFailed(res, 400, respo.message, {}, {});
        }
        return jsonSuccess(res, 200, respo.message, respo.data, {});
    }
}
