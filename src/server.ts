import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import logger from './utils/logger';
import config from './config';

const app = express();

/**
 * Setup Sever Listener Port
 */
const PORT = parseInt(config.port, 10);

app.listen(PORT, () => {
  logger.info(`Running Node.js version ${config.node_version}`);
  logger.info(`App environment: ${config.env}`);
  logger.info(`App is running on port ${PORT}`);
});

export default app;