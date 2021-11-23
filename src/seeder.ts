import UserRepository from './app/repository/user.respository';
import { Encrypt } from './app/services/auth/encrpty.service';
import config from './config';

const _userRepository = new UserRepository();
export const createSuperAdmin = async (): Promise<any> => {
    const checkSuperAdmin = await _userRepository.findOne({ superAdmin: true });

    try {
        if (!checkSuperAdmin) {
            const password = await Encrypt(config.superAdminPassword);
            await _userRepository.create({ username: 'superAdmin', email: config.superAdminEmail, password, superAdmin: true });
            console.log('Super admin created');
        }
    } catch (err) {
        console.error(err);
    }
};
