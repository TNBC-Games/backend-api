import IUserModel from "./interfaces/IUserModel";

class HeroModel {
   private _heroModel: IUserModel;
   
   constructor(heroModel: IUserModel) {
       this._heroModel = heroModel;
   }
   get userName (): string {
       return this._heroModel.username || '' ;
   }
    
};
export =  HeroModel;