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
                points: {
                    type: Number,
                    default: 0
                },
                earnings: {
                    type: Number,
                    default: 0
                },
                gold: {
                    type: Number,
                    default: 0
                },
                silver: {
                    type: Number,
                    default: 0
                },
                bronze: {
                    type: Number,
                    default: 0
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
