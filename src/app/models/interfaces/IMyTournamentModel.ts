import mongoose from 'mongoose';

interface MyTournametModel extends mongoose.Document {
    user: string;
    tournament: string;
}

export = MyTournametModel;
