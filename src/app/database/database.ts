import Mongoose from "mongoose";
import config from "../../config";
import logger from "../../utils/logger";

const dbUrl = config.database.url;
    
class DataAccess {
    static mongooseInstance: any;
    static mongooseConnection: Mongoose.Connection;
    
    constructor () {
        DataAccess.connect();
    }
    
    static connect (): Mongoose.Connection {
        if(this.mongooseInstance) return this.mongooseInstance;
        
        this.mongooseConnection  = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            logger.info('MongoDB Database connected');
        });
        
        this.mongooseInstance = Mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
        return this.mongooseInstance;
    }   
}

// DataAccess.connect();
export default DataAccess;