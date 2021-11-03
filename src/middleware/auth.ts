import jwt from 'jsonwebtoken';
import config from '../config';
import { Request, Response, NextFunction } from 'express';
import { jsonFailed } from '../utils/response';

export = (req: Request, res: Response, next: NextFunction): any => {
    const accessToken: any = req.header('x-auth-token');
    if (!accessToken) {
        return jsonFailed(res, 400, 'Unauthorized, token needed for authorization', {}, {});
    }
    try {
        const decode: any = jwt.verify(accessToken, config.accessTokenSecret);
        res.locals.id = decode.user.id;
        next();
    } catch (err: any) {
        return jsonFailed(res, 400, err.message, {}, {});
    }
};
