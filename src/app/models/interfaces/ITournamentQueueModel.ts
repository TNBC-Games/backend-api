import mongoose from 'mongoose';

interface TournamentQueue extends mongoose.Document {
    user: string;
    tournament: string;
    status: string;
}

export = TournamentQueue;
