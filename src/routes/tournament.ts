import { celebrate } from 'celebrate';
import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import TournamentController from '../app/controllers/tournament.controller';
import container from '../helpers/inversify';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const TournamentControllerInstance = container.get<TournamentController>(TournamentController);

export default {
    baseUrl: '/tournament',
    router
};
