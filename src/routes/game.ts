import { celebrate } from 'celebrate';
import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import GameController from '../app/controllers/game.controller';
import { addGameSchema } from '../app/requests/game.request';
import container from '../helpers/inversify';
import { auth, admin, checkImage } from '../middleware/auth';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const GameControllerInstance = container.get<GameController>(GameController);

router.post('/', auth, admin, celebrate(addGameSchema), controllerWrapper(GameControllerInstance.addGame));
router.post('/publish/:name', auth, admin, controllerWrapper(GameControllerInstance.publishGame));
router.post('/unpublish/:name', auth, admin, controllerWrapper(GameControllerInstance.unPublishGame));
router.post('/uploadImage/:name', auth, admin, checkImage, controllerWrapper(GameControllerInstance.uploadGameImage));
router.get('/', GameControllerInstance.getGames);
router.get('/unpublished', auth, admin, GameControllerInstance.getUnpublishedGames);
router.get('/:name', GameControllerInstance.getGame);
router.get('/search/:name', GameControllerInstance.searchGames);
router.put('/:name', auth, admin, GameControllerInstance.updateGame);

export default {
    baseUrl: '/game',
    router
};
