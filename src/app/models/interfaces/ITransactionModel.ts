import mongoose from 'mongoose';

interface TransactionModel extends mongoose.Document {
    user: string;
    transactionId: string;
    type?: string;
    amount: number;
    memmo?: string;
    account?: string;
    description?: string;
}

export = TransactionModel;
