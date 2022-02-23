import ITransactionModel from '../models/interfaces/ITransactionModel';
import TransactionSchema from '../models/schemas/transaction.schema';
import BaseRepository from './base/base.repository';

export default class TransactionRepository extends BaseRepository<ITransactionModel> {
    constructor() {
        super(TransactionSchema);
    }
}
