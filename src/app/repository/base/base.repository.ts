// import all interfaces
import { IWrite } from '../interfaces/write.interface';
import { IRead } from '../interfaces/read.interface';
import mongoose from 'mongoose';

// Base Class
export default abstract class BaseRepository<T extends any> implements IWrite<T>, IRead<T> {
    // that extends your base repository and reuse on methods of class
    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<any>) {
        this._model = schemaModel;
    }

    async create(item: any): Promise<boolean> {
        let response = await this._model.create(item);
        return !!response;
    }

    async updateById(id: mongoose.Types.ObjectId, item: any): Promise<boolean> {
        let response = await this._model.updateOne({ _id: id }, { ...item });
        return !!response;
    }

    async updateOne(filter: any, item: any): Promise<boolean> {
        let response = await this._model.updateOne({ ...filter }, { ...item });
        return !!response;
    }

    async delete(id: string): Promise<boolean> {
        let response = await this._model.updateOne({ _id: id }, { deleted: true, deletedAt: new Date() });
        return !!response;
    }

    async find(item: any): Promise<any> {
        let response = await this._model.find({});
        return response;
    }

    async findOne(filter: object): Promise<any> {
        let response = await this._model.findOne(filter);
        return response;
    }

    async findById(id: string): Promise<any> {
        let response = await this._model.findOne({ _id: id });
        return response;
    }
}
