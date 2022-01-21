import { celebrate } from 'celebrate';
import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import TournamentController from '../app/controllers/tournament.controller';
import { createTournamentSchema, updateTournamentSchema } from '../app/requests/tournament.request';
import container from '../helpers/inversify';
import { admin, auth, checkImage } from '../middleware/auth';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const TournamentControllerInstance = container.get<TournamentController>(TournamentController);

router.post('/', auth, admin, celebrate(createTournamentSchema), controllerWrapper(TournamentControllerInstance.createTournament));
router.post('/enter/:id', auth, controllerWrapper(TournamentControllerInstance.enterTournament));
router.get('/', controllerWrapper(TournamentControllerInstance.getTournaments));
router.get('/myTournaments', auth, controllerWrapper(TournamentControllerInstance.getMyTournaments));
router.get('/:id', controllerWrapper(TournamentControllerInstance.getTournament));
router.put('/:id', auth, admin, celebrate(updateTournamentSchema), controllerWrapper(TournamentControllerInstance.updateTournament));
router.delete('/', auth, admin, controllerWrapper(TournamentControllerInstance.deleteTournament));
router.post('/uploadImage/:id', auth, admin, checkImage, controllerWrapper(TournamentControllerInstance.uploadTournamentImage));

export default {
    baseUrl: '/tournament',
    router
};
