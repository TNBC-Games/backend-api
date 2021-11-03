import IUserModel from '../interfaces/IUserModel';
import mongoose from 'mongoose';

class UserSchema {
    static get schema() {
        var schema = new mongoose.Schema(
            {
                email: {
                    type: String
                },
                username: {
                    type: String
                },
                password: {
                    type: String
                },
                oauth: {
                    type: Boolean,
                    default: false
                },
                googleId: {
                    type: String
                },
                discordId: {
                    type: String
                }
            },
            {
                timestamps: true
            }
        );
        return schema;
    }
}

const schema = mongoose.model<IUserModel>('Users', UserSchema.schema);
export default schema;
