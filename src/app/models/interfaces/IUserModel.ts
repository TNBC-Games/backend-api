import mongoose from 'mongoose';

interface UserModel extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    admin: boolean;
    oauth: boolean;
    googleId?: boolean;
    discordId?: boolean;
}

export = UserModel;
