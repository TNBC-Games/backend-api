import { Container } from 'inversify';
import { TYPES } from './types';
// import AuthRepository, { IAuthRepository } from '../app/repositories/auth.repository';
// import AuthService, { IAuthService } from '../app/services/auth.service';
import AuthController from '../app/controllers/auth.controller';
import UserController from '../app/controllers/user.controller';

const container = new Container({ defaultScope: 'Singleton' });
container.bind(AuthController).to(AuthController);
container.bind(UserController).to(UserController);
// container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
// container.bind<IUserService>(TYPES.UserService).to(UserService);

export default container;
