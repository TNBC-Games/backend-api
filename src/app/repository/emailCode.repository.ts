import IEmailCodeModel from '../models/interfaces/IEmailCodeModel';
import EmailCodeSchema from '../models/schemas/emailCode.schema';
import BaseRepository from './base/base.repository';

export default class EmailCodeRepository extends BaseRepository<IEmailCodeModel> {
    constructor() {
        super(EmailCodeSchema);
    }
}
