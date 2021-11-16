import IGameModel from '../interfaces/IGameModel';
import mongoose from 'mongoose';

class GameSchema {
    static get schema() {
        var categoriesSchema = new mongoose.Schema({
            category: {
                type: String,
                required: true
            }
        });

        var schema = new mongoose.Schema(
            {
                name: {
                    type: String,
                    required: true
                },
                mainCategory: {
                    type: String,
                    requierd: true
                },
                categories: {
                    type: [categoriesSchema],
                    required: false
                }
            },
            {
                timestamps: true
            }
        );
        return schema;
    }
}

const schema = mongoose.model<IGameModel>('Games', GameSchema.schema);
export default schema;
