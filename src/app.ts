// import { install as installSourceMapSupport } from 'source-map-support';
// installSourceMapSupport();
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import compress from 'compression';
import app from './server';
import cors from 'cors';
import routes from './routes';
import errorHandler from './errors/error.handler';
import logger from './utils/logger';
import initDB from './helpers/database';
import config from './config';

/**
 * This is a bootstrap function
 */

async function bootstrap() {
  // Attach HTTP request info logger middleware in test mode
  // if (config.env !== 'production') {
    app.use((req: Request, _res: Response, next: NextFunction) => {
      logger.debug(`[${req.method}] ${req.hostname}${req.url}`);
      next();
    });
    app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
      res.header(
         'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept'
      );
      next();
   });
  // }

  app.disable('x-powered-by'); // Hide information
  app.use(compress()); // Compress

  // Enable middleware/whatever only in Production
  if (config.env === 'production') {
    // For example: Enable sentry in production
    // app.use(Sentry.Handlers.requestHandler());
  }

  /**
   * Configure cors
   */
  app.use(cors());

  /**
   * Configure mongoose
   **/
  // if (!initDB.isDbConnected()) {
    await initDB.connect();
  // }

  /**
   * Configure body parser
   */
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  /**
   * Host static public directory
   */
  // app.use('/', express.static('public'));

  /**
   * Configure routes
   */
  app.get("/", (_: Request, res: Response) => {
    return res.json({status:'Online', message:`Online on ${new Date()}`})
  });

  // API doc Route
  app.get("/download", (_: Request, res: Response) => {
	  const file = `${__dirname}/public/APIDoc.json`;
    return res.download(file);
  });

  // app.use('/api/auth',require('./routes/auth').default.router)
  app.use('/v1', routes);
  // routes(app);

  /**
   * Configure error handler
   */
  errorHandler(app);
}

// Need for integration testing
export default app;

// Invoking the bootstrap function
bootstrap()
  .then(() => {
    logger.info('Server is up');
  })
  .catch((error) => {
    // console.log(error);
    logger.error('Unknown error. ' + error.message);
  });