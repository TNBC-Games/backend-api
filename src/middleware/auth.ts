import jwt from 'jsonwebtoken';
import config from '../config';
import { Request, Response, NextFunction } from 'express';
import { jsonFailed } from '../utils/response';
import UserRepository from '../app/repository/user.respository';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
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

export const superAdmin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!res.locals.id) {
        return jsonFailed(res, 400, 'Unauthorized, token needed for authorization', {}, {});
    }
    const _userRepository = new UserRepository();
    const user = await _userRepository.findById(res.locals.id);

    if (user.superAdmin) {
        next();
    } else {
        return jsonFailed(res, 400, 'Route is only accessible to the super admin', {}, {});
    }
};

export const admin = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    if (!res.locals.id) {
        return jsonFailed(res, 400, 'Unauthorized, token needed for authorization', {}, {});
    }
    const _userRepository = new UserRepository();
    const user = await _userRepository.findById(res.locals.id);

    if (user.admin || user.superAdmin) {
        next();
    } else {
        return jsonFailed(res, 400, 'Route is only accessible to admins', {}, {});
    }
};
