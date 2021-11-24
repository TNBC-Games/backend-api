import { celebrate } from 'celebrate';
import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import TournamentController from '../app/controllers/tournament.controller';
import { createTournamentSchema } from '../app/requests/tournament.request';
import container from '../helpers/inversify';
import { admin, auth } from '../middleware/auth';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const TournamentControllerInstance = container.get<TournamentController>(TournamentController);

router.post('/', auth, admin, celebrate(createTournamentSchema), controllerWrapper(TournamentControllerInstance.createTournament));
router.get('/', controllerWrapper(TournamentControllerInstance.getTournaments));

export default {
    baseUrl: '/tournament',
    router
};
