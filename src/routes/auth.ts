import { celebrate } from 'celebrate';
import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import AuthController from '../app/controllers/auth.controller';
import { loginSchema, registrationSchema } from '../app/requests/auth.request';
import container from '../helpers/inversify';
import passport from 'passport';
import { jsonSuccess } from '../utils/response';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const AuthControllerInstance = container.get<AuthController>(AuthController);

router.post('/register', celebrate(registrationSchema), controllerWrapper(AuthControllerInstance.register));
router.post('/login', celebrate(loginSchema), controllerWrapper(AuthControllerInstance.login));
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/redirect', passport.authenticate('google'), controllerWrapper(AuthControllerInstance.Oauth));
router.get('/discord', passport.authenticate('discord'));
router.get('/discord/redirect', passport.authenticate('discord'), controllerWrapper(AuthControllerInstance.Oauth));
// router.get('/oauth', controllerWrapper(AuthControllerInstance.Oauth));

export default {
    baseUrl: '/auth',
    router
};
