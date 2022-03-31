import { celebrate } from 'celebrate';
import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import UserController from '../app/controllers/user.controller';
import { updateUserSchema } from '../app/requests/user.requests';
import container from '../helpers/inversify';
import { auth, checkImage } from '../middleware/auth';
import { jsonSuccess } from '../utils/response';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const UserControllerInstance = container.get<UserController>(UserController);

router.get('/', auth, controllerWrapper(UserControllerInstance.getUser));
router.put('/', auth, celebrate(updateUserSchema), controllerWrapper(UserControllerInstance.updateUser));
router.get('/leaderBoard', controllerWrapper(UserControllerInstance.getLeaderBoard));
router.post('/avatar', auth, checkImage, controllerWrapper(UserControllerInstance.uploadAvatar));
router.delete('/avatar', auth, controllerWrapper(UserControllerInstance.removeAvatar));
router.get('/profile/:id', controllerWrapper(UserControllerInstance.getUserProfile));
router.get('/transactions', auth, controllerWrapper(UserControllerInstance.getTransactions));

export default {
    baseUrl: '/user',
    router
};
