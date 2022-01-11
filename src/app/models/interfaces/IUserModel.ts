import mongoose from 'mongoose';

interface UserModel extends mongoose.Document {
    email: string;
    username: string;
    password: string;
    avatar: string;
    admin: boolean;
    oauth: boolean;
    googleId?: boolean;
    discordId?: boolean;
    cloudinaryId?: string;
}

export = UserModel;
