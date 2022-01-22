import IUserRecord from '../interfaces/IUserRecord';
import mongoose from 'mongoose';

class UserRecord {
    static get schema() {
        var schema = new mongoose.Schema(
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                game: {
                    type: String
                },
                earnings: {
                    type: Number
                },
                points: {
                    type: Number
                },
                gold: {
                    type: Number
                },
                silver: {
                    type: Number
                },
                bronze: {
                    type: Number
                },
                reason: {
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

const schema = mongoose.model<IUserRecord>('UserRecords', UserRecord.schema);
export default schema;
