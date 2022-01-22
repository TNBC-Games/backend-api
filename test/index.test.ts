import * as faker from 'faker';
import log from '../src/utils/logger';
// import Repository from '../src/app/repositories/repository';
// import { UserDocument } from '../src/app/repositories/user.repository';

if (process.env.NODE_ENV !== 'test') {
  log.error('Invalid environment for tests');
  process.exit(1);
}

// let userRepository: Repository<UserDocument>;

beforeEach(async () => {
  try {
    // await clearDatabase();
  } catch (error:any) {
    log.info(error.message);
  }
});


beforeAll(async () => {
    try {
      jest.setTimeout(10000);
  
      // Wait for Jest to run the app and connect to database
      await new Promise((resolve) => setTimeout(resolve, 5000));
  
      // userRepository = new Repository<UserDocument>('users');
  
      // await clearDatabaseIndices();
    } catch (error:any) {
      log.info(error.message);
    }
});

// async function clearDatabase() {
//     await userRepository.remove({}, true);
// }
  
// async function clearDatabaseIndices() {
//     await userRepository.getCollection().dropIndexes();
// }

// export async function createUser(username?: string, email?: string, password = 'password') {
//     username = username ?? faker.internet.userName();
//     email = email ?? faker.internet.email();
//     // password = 'password';

//     const user = await userRepository.create({ username, email, password });
//     return user;
// }

// export async function createNUsers(number: number) {
//     while (number--) {
//         const password = 'test';
//         const email = faker.internet.email();
//         const username = faker.internet.userName();
//         await createUser(username, email, password);
//     }
// }
