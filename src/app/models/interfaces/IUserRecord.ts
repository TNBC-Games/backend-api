import mongoose from 'mongoose';

interface UserRecord extends mongoose.Document {
    user: string;
    earnings?: number;
    points?: number;
    gold?: number;
    silver?: number;
    bronze?: number;
    reason?: string;
}

export = UserRecord;
