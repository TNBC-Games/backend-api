import IEmailCodeModel from '../interfaces/IEmailCodeModel';
import mongoose from 'mongoose';

class EmailCodeSchema {
    static get schema() {
        var schema = new mongoose.Schema({
            email: {
                type: String,
                required: true
            },
            emailCode: {
                type: String,
                required: true
            }
        });
        return schema;
    }
}

const schema = mongoose.model<IEmailCodeModel>('EmailCodes', EmailCodeSchema.schema);
export default schema;
