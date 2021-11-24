import ITournamentModel from '../interfaces/ITournamentModel';
import mongoose from 'mongoose';

class TournamentSchema {
    static get schema() {
        var schema = new mongoose.Schema(
            {
                creator: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Users'
                },
                name: {
                    type: String,
                    required: true
                },
                prize: {
                    type: Number,
                    required: true
                },
                fee: {
                    type: Number,
                    required: true
                },
                limit: {
                    type: Number,
                    required: true
                },
                startDate: {
                    type: Date,
                    required: true
                },
                info: {
                    type: String,
                    required: true
                },
                type: {
                    type: String,
                    required: true
                },
                game: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Games'
                },
                rules: {
                    type: String
                },
                howToApply: {
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

const schema = mongoose.model<ITournamentModel>('Tournaments', TournamentSchema.schema);
export default schema;
