import mongoose from 'mongoose';

interface TournametModel extends mongoose.Document {
    name: string;
    prize: number;
    fee: number;
    limit: number;
    startDate: string;
    info?: string;
    rules?: string;
    howToApply?: string;
}

export = TournametModel;
