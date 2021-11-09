import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import UserController from '../app/controllers/user.controller';
import container from '../helpers/inversify';
import auth from '../middleware/auth';
import { jsonSuccess } from '../utils/response';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const UserControllerInstance = container.get<UserController>(UserController);

router.get('/', auth, controllerWrapper(UserControllerInstance.getUser));
router.put('/', auth, controllerWrapper(UserControllerInstance.updateUser));

export default {
    baseUrl: '/user',
    router
};
