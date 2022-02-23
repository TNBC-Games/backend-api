import { injectable, inject } from 'inversify';
import TransactionRepository from '../../repository/transaction.repository';
import UserRepository from '../../repository/user.respository';
import { systemResponse } from '../../../utils/response';
import { Bank } from 'thenewboston';
import config from '../../../config';
import axios from 'axios';
import { genMemo } from './transaction.util';
import mongoose from 'mongoose';

@injectable()
export default class UserService {
    private _transactionRepository: TransactionRepository;
    private _userRepository: UserRepository;
    private limit: number;

    constructor() {
        this._transactionRepository = new TransactionRepository();
        this._userRepository = new UserRepository();
        this.limit = 20;
    }

    public async validateTransaction(): Promise<any> {
        let url = `http://54.183.16.194/bank_transactions?limit=20&offset=0&recipient=${config.tnbAccountNumber}`;

        const getTransactions = async (url: string): Promise<any> => {
            await axios
                .get(url)
                .then(async (res: any) => {
                    const transactions = res.data.results;
                    let next = true;

                    const validate = transactions.map(async (transaction: any): Promise<any> => {
                        const key = transaction.memo.split('_')[0];
                        const user = transaction.memo.split('_')[1];
                        const transactionId = transaction.id;

                        if (key === 'TNBG' && mongoose.Types.ObjectId.isValid(user)) {
                            const _user = await this._userRepository.findById(user);
                            const checkTransaction = await this._transactionRepository.findOne({ user: _user.id, transactionId, type: 'deposit' });

                            if (!checkTransaction) {
                                const data = {
                                    user,
                                    transactionId,
                                    memo: transaction.memo,
                                    amount: transaction.amount,
                                    type: 'deposit',
                                    description: 'Payment Recieved'
                                };

                                if (_user) {
                                    await this._transactionRepository.create(data);
                                    await this._userRepository.updateById(_user.id, { balance: _user.balance + transaction.amount });
                                    return true;
                                }
                            } else {
                                next = false;
                                return null;
                            }
                        } else {
                            return null;
                        }
                    });

                    await Promise.all(validate)
                        .then((res2: any) => {
                            console.log(res2);

                            if (res.data.next && next) {
                                getTransactions(res.data.next);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
                .catch((err) => console.log(err));
        };

        getTransactions(url);
        return systemResponse(true, '', {});
    }

    public async getTransactionDetails(id: string): Promise<any> {
        const user = await this._userRepository.findById(id, '-password -cloudinaryId');
        const result = {
            acctNumber: config.tnbAccountNumber,
            memo: genMemo(user.id)
        };

        return systemResponse(true, '', result);
    }
}
