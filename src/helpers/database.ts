import DataAccess from "../app/database/database";

// class initDB {
//     connect = async () => {
//         try {
//             const dbUrl = config.database.url;
//             const connection = await mongoose.connect(dbUrl, {
//                 useNewUrlParser: true,
//                 useUnifiedTopology: true,
//                 useFindAndModify: false,
//                 useCreateIndex: true
//             });
//             log.info('Database connected');
//             return connection;
//         } catch (error) {
//             log.error(error);
//             throw Error('Error connecting to database');
//         }
//     };
//     disconnect = async () => {
//         try {
//             await mongoose.connection.close();
//         } catch (error) {}
//     };
// }

const db = DataAccess;

export default db;
