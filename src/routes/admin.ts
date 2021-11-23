import { celebrate } from 'celebrate';
import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import AdminController from '../app/controllers/admin.controller';
import { registrationSchema } from '../app/requests/auth.request';
import container from '../helpers/inversify';
import { superAdmin, auth } from '../middleware/auth';
import { jsonSuccess } from '../utils/response';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const AdminControllerInstance = container.get<AdminController>(AdminController);

router.post('/', auth, superAdmin, celebrate(registrationSchema), controllerWrapper(AdminControllerInstance.createAdmin));
router.get('/', auth, superAdmin, celebrate(registrationSchema), controllerWrapper(AdminControllerInstance.getAdmins));

export default {
    baseUrl: '/admin',
    router
};
