import { celebrate } from 'celebrate';
import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import GameController from '../app/controllers/game.controller';
import container from '../helpers/inversify';
import auth from '../middleware/auth';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const GameControllerInstance = container.get<GameController>(GameController);

router.post('/', auth, controllerWrapper(GameControllerInstance.addGame));

export default {
    baseUrl: '/game',
    router
};
