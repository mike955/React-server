import * as path from 'path';
import * as Koa from "Koa";
import * as bodyParser from "koa-bodyparser";
import * as serve from "koa-static";
import * as logger from "koa-morgan";
import * as cors from 'koa2-cors';
import  Route from './router/router';

const app = new Koa();

// log
app.use(logger("dev"));

// error handler
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        console.error(err);
        ctx.status = 200;
        ctx.body = JSON.stringify({
            error: 1010,
            errmsg: 'unknown route error'
        })
    }
});

// bodyparser
app.use(bodyParser({
    enableTypes: ['json', 'form'],
    jsonLimit: '10240kb',
    extendTypes: {
        json: ['application/x-javascript']
    },
    onerror: (err, ctx) => {
        console.error(err);
        ctx.throw('body parse error', 422);
    }
}))

// static server
app.use(serve(path.join(__dirname, '..', 'public')));

// cors
app.use(cors({
    origin: '*'
}))

//router
app.use(async (koaCtx: Koa.Context, next: () => Promise<any>) => {
    const req:Koa.Request = koaCtx.request;
    const url_components:Array<String> = req.url.split('/');
    if(url_components.length <= 4){
        await next();
    }
    const ctx:Object = {};
    ctx['category'] = url_components[1];
    ctx['catalog'] = url_components[2];
    ctx['content'] = url_components[3];
    const api = new Route(ctx);
    const result = await api.execute();
    koaCtx.body = result;
})

// 404
// app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
//     ctx.status = 200;
//     ctx.body = 'Not Found';
// });

export = app;