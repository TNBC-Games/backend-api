import IUserModel from "../models/interfaces/IUserModel";
import UserSchema from "../models/schemas/user.schema";
import BaseRepository from "./base/base.repository";

export default class UserRepository  extends BaseRepository<IUserModel> {
    constructor () {
        super(UserSchema);
    }    
};
