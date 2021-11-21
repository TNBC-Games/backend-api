import { Application, Request, Response, NextFunction } from 'express';
import { NotFoundError, ApplicationError } from './app.errors';
import { MongoError } from 'mongodb';
import log from '../utils/logger';
import { jsonFailed, jsonServerError } from '../utils/response';
import { errors, isCelebrateError } from "celebrate";

export default function (app: Application) {

  /**
   * Handle errors
   */

  // If you are lost
  app.use(() => {
    throw new NotFoundError('You are lost');
  });

  // Request error handler
  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    console.log('<---Error--->', err);
    if (err instanceof SyntaxError) {
      return jsonFailed(res, 400, 'Bad Request', null, 'Bad Request');
    }
    if (isCelebrateError(err)) {
      const messages =  err.details;
      let jsonObject:any = {};  
      messages.forEach((value:any, key:any) => {jsonObject[key] = value});  
      let msg = jsonObject.body.details.map((er:any)=>{ return {[er.path]: er.message.replace(/["]+/g, '')}});
      console.log('json==>', msg);
      return jsonFailed(res, 400, 'Bad Request', msg, msg);
    }
    if (err.message) {
      return jsonFailed(res, err.code, err.message, {}, err);
    }
    app.use(errors());
    // return next(err);
  });

  // Log all errors
  app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    const userString = 'unknown user';
    if (err instanceof MongoError) {
      if (err.code === 11000) {
        log.error(`${req.method} ${req.path}: MongoDB duplicate entry from ${userString}`);
      } else {
        log.error(`${req.method} ${req.path}: Unhandled MongoDB error ${userString}. ${err.errmsg}`);
      }
      if (!res.headersSent) {
        return res.sendStatus(500);
      }
    } else if (err instanceof Error) {
      log.error(`${req.method} ${req.path}: Unhandled request error ${userString}. ${err.message}`);
    } else if (typeof err === 'string') {
      log.error(`${req.method} ${req.path}: Unhandled request error ${userString}. ${err}`);
    } 
    console.log('---', err);
    // log.error(`${req.method} ${req.path}: Request error ${userString}. ${err}`);
    return next(err);
  });

  // Optional fallthrough error handler
  app.use(function onError(err: Error, _req: Request, res: Response, _next: NextFunction) {
    return jsonServerError(res, 500, 'Internal Server Error', {}, err);
  });
}