import IUserRecord from '../models/interfaces/IUserRecord';
import UserRecord from '../models/schemas/userRecord.schema';
import BaseRepository from './base/base.repository';

export default class UserRecordRepository extends BaseRepository<IUserRecord> {
    constructor() {
        super(UserRecord);
    }
}
