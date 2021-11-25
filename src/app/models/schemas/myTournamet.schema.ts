import IMyTournamentModel from '../interfaces/IMyTournamentModel';
import mongoose from 'mongoose';

class TournamentSchema {
    static get schema() {
        var schema = new mongoose.Schema(
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                tournament: {
                    type: mongoose.Schema.Types.ObjectId,
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

const schema = mongoose.model<IMyTournamentModel>('MyTournaments', TournamentSchema.schema);
export default schema;
