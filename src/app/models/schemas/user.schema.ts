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
                avatar: {
                    type: String,
                    default: null
                },
                balance: {
                    type: Number,
                    default: 0
                },
                admin: {
                    type: Boolean
                },
                superAdmin: {
                    type: Boolean
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
                },
                cloudinaryId: {
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
