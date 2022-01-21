import mongoose from 'mongoose';

interface TournametModel extends mongoose.Document {
    creator: string;
    name: string;
    prize: number;
    fee: number;
    limit: number;
    startDate: string;
    info: string;
    type: string;
    game: string;
    rules?: string;
    howToApply?: string;
    image?: string;
    cloudinaryId?: string;
}

export = TournametModel;
