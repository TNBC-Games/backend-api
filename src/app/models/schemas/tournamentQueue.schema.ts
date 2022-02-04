import IUserModel from '../interfaces/IUserModel';
import mongoose from 'mongoose';

class TournamentQueueSchema {
    static get schema() {
        var schema = new mongoose.Schema(
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Users'
                },
                tournament: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Tournaments'
                },
                status: {
                    type: String,
                    required: true
                }
            },
            {
                timestamps: true
            }
        );
        return schema;
    }
}

const schema = mongoose.model<IUserModel>('Users', TournamentQueueSchema.schema);
export default schema;
