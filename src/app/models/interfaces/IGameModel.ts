import mongoose from 'mongoose';

interface GameModel extends mongoose.Document {
    name: string;
    mainCategory: string;
    avatar?: string;
    cloudinaryId?: string;
    categories?: { category: string }[];
}

export = GameModel;
