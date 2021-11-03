import mongoose from 'mongoose';

interface EmailCodeModel extends mongoose.Document {
    email: string;
    emailCode: string;
}

export = EmailCodeModel;
