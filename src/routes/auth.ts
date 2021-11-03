import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import AuthController from '../app/controllers/auth.controller';
import container from '../helpers/inversify';
import { jsonSuccess } from '../utils/response';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const AuthControllerInstance = container.get<AuthController>(AuthController);

export default {
    baseUrl: '/auth',
    router
};
