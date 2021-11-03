import mongoose from 'mongoose';

interface UserModel extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    oauth: boolean;
    googleId: boolean;
    discordId: boolean;
}

export = UserModel;
