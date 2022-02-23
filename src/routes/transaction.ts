import express from 'express';
import controllerWrapper from '../app/adaptors/controller';
import TransactionController from '../app/controllers/transaction.controller';
import container from '../helpers/inversify';
import { auth } from '../middleware/auth';

const router = express.Router();

/**
 * Configure all the services with the express application
 */

// Iterate over all our controllers and register our routes
const TransactionControllerInstance = container.get<TransactionController>(TransactionController);

router.post('/validate', controllerWrapper(TransactionControllerInstance.validateTransaction));
router.get('/details', auth, controllerWrapper(TransactionControllerInstance.getTransactionDetails));

export default {
    baseUrl: '/transaction',
    router
};
