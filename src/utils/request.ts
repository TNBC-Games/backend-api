import axios, { Method } from "axios";
import to from "await-to-js";
import https from "https";
import httpContext from "express-http-context";
import config from "../config";

export const makeRequest = async (url:string, method:Method, payload:any = {}, headers:any = {}, meta = {}, reject_unauthorized = true) => {
    headers["Content-Type"] = headers["Content-Type"] ? headers["Content-Type"] : "application/json";
    let _err = null;
    let _res = null;

    let httpsAgent;
    if (!reject_unauthorized) {
        httpsAgent = new https.Agent({ rejectUnauthorized: false });
    }
    const reqId = httpContext.get("reqId");
    const sessionId = httpContext.get("sessionId");

    if (!headers.requestId && !headers.request_id) {
        headers.request_id = reqId || "NO-LSQ-ID";
    }

    if (!headers.sessionId && !headers.session_id) {
        headers.session_id = sessionId || reqId || "NO-SESSION-ID";
    }

    [ _err, _res ] = await to(
        axios({ 
            method: method,
            url: url,
            data: payload,
            headers: headers,
            httpsAgent
        })
    );

    // let host = null;
    let responseBody = null;

    if (!_res || !_res.status || (_res.status !== 200 && _res.status !== 204)) {
        // console.log('\n\n\n', _res, _err, '\n\n\n');
        let err:any = _err;
        let message = "";
        if (err && err.response && err.response.data) {
            responseBody = err.response.data.data || err.response.data;
            message = err.response.data.message;
        } else {
            message = err.message;
        }
        const m = err.response ? err.response.data : err.response;
        const statusCode = err.response ? err.response.status : 400;
        // logger(message, method, url, payload, responseBody, statusCode, host, m, 'FAILED', reqId, sessionId);
        return {
            success: false,
            message,
            data: responseBody,
            statusCode,
            meta: m
        };
    }

    responseBody = _res.data.data || _res.data;
    // logger.info(meta, method, url, payload, responseBody, _res.status, host, responseBody, 'SUCCESS', reqId, sessionId);
    return {
        success: true,
        message: "success",
        data: responseBody,
        statusCode: _res.status
    };
};

export const cardAPIRequest = async (url:string, method:Method, payload:any = {}, headers:any = {}, meta = {}, reject_unauthorized = true) =>{
    const mainUrl = `${config.CARD.url}/url`;
    const mainHeaders = {
        ...headers
    };
    return makeRequest(mainUrl, method, payload, mainHeaders, meta, reject_unauthorized);
}