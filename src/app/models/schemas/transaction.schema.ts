import ITransactionModel from '../interfaces/ITransactionModel';
import mongoose from 'mongoose';

class TransactionSchema {
    static get schema() {
        var schema = new mongoose.Schema(
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Users'
                },
                transactionId: {
                    type: String,
                    required: true
                },
                type: {
                    type: String
                },
                amount: {
                    type: Number,
                    required: true
                },
                memo: {
                    type: String
                },
                account: {
                    type: String
                },
                description: {
                    type: String
                }
            },
            {
                timestamps: true
            }
        );
        return schema;
    }
}

const schema = mongoose.model<ITransactionModel>('Transactions', TransactionSchema.schema);
export default schema;
