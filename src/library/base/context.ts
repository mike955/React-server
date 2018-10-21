import * as Koa from 'koa';

export type HTTPRequest = Koa.Request;


export interface ContextInternal {
    req: Koa.Request,
    res: Koa.Response,
    koaCtx: Koa.Context
}

