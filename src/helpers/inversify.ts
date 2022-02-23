import { Container } from 'inversify';
import { TYPES } from './types';
// import AuthRepository, { IAuthRepository } from '../app/repositories/auth.repository';
// import AuthService, { IAuthService } from '../app/services/auth.service';
import AuthController from '../app/controllers/auth.controller';
import UserController from '../app/controllers/user.controller';
import AdminController from '../app/controllers/admin.controller';
import GameController from '../app/controllers/game.controller';
import TournamentController from '../app/controllers/tournament.controller';
import TransactionController from '../app/controllers/transaction.controller';

const container = new Container({ defaultScope: 'Singleton' });
container.bind(AuthController).to(AuthController);
container.bind(UserController).to(UserController);
container.bind(AdminController).to(AdminController);
container.bind(GameController).to(GameController);
container.bind(TournamentController).to(TournamentController);
container.bind(TransactionController).to(TransactionController);
// container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
// container.bind<IUserService>(TYPES.UserService).to(UserService);

export default container;
