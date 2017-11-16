/**
 * Created by zhang on 2016/12/12.
 */
"use strict";
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');
const restc = require('restc');

const session   = require('koa-session2');
//koa-bodyparser  解析原始request请求
const bodyParser = require('koa-bodyparser');

const model         = require('./lib/model');
const controller    = require('./lib/controller');
const rest          = require('./lib/rest');
const Store         = require("./lib/redisStore");

const catalog       = require('./middleware/catalog');
const log           = require('./middleware/log');

//middleware

// use restc middleware
// app.use(restc.koa2());

//seed
// const seed = require('./middleware/seed');
// app.use(seed.seed());

//log middleware
app.use(log());

//注意顺序问题  parse request body:
app.use(bodyParser());

//catalog middleware
app.use(catalog());

// static file support:
const isProduct = process.env.NODE_EV === 'production';
if (! isProduct) {
    let staticFiles = require('./lib/static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

app.use(session({
    key: "SESSIONID",   //default "koa:sess"
}));

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

let server = app.listen(3300);

var chatServer = require('./lib/chat_server');
chatServer.listen(server);

console.log('app started at port 3300');