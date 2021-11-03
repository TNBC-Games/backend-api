// import { Response } from 'express';
import { ISystemR } from './types';
// JSon API response
export const jsonResponse = (res: any, status:string, code:number, message:string, data:object, meta={}) => {
    return res.status(code).json({ code, status, message, data });
};

// Json API Success Response
export const jsonSuccess = (res: any, code:number, message:string, data:object, meta={}) => {
    return jsonResponse(res, 'success', code, message, data, meta)
}

// JSON API Failed Response
export const jsonFailed = (res: any, code:number, message:string, data:any, meta={}) => {
    return jsonResponse(res, 'error', code, message, data, meta);
}

export const jsonServerError = (res: any, code:number=500, message:string, data:object, meta={}) => {
    return jsonResponse(res, 'Internal Sever Error', code, message, data, meta);
}

export const systemResponse = (success:boolean, message:string, data: object): ISystemR => {
    return { success, message, data };
}