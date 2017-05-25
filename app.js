/**
 * Created by zhang on 2016/12/12.
 */
"use strict";
const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

const session   = require('koa-session2');
//koa-bodyparser  解析原始request请求
const bodyParser = require('koa-bodyparser');

const model         = require('./lib/model');
const controller    = require('./lib/controller');
const rest          = require('./lib/rest');
const catalog       = require('./middleware/catalog');
const log           = require('./middleware/log');

//middleware

//seed
// const seed          = require('./middleware/seed');
// app.use(seed.seed());

//app.use(session());

app.use(log());

//注意顺序问题  parse request body:
app.use(bodyParser());

//catalog
app.use(catalog());

// static file support:
const isProduct = process.env.NODE_EV === 'production';
if (! isProduct) {
    let staticFiles = require('./lib/static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// bind .rest() for ctx:
app.use(rest.restify());

// add controllers:
app.use(controller());

let server = app.listen(3300);

var chatServer = require('./lib/chat_server');
chatServer.listen(server);

// const webSocket = require('ws');

// const webSocketServer = webSocket.Server;
// const wss = new webSocketServer({
//     server: server
// });

// wss.on('connection',function(ws){
//     ws.on('message',function(message){
//         //console.log(`[SERVER] Received: ${message}`);
//         ws.send(`${message}`,(err)=>{
//             if(err){
//                 console.log(`[SERVER] error: ${err}`);
//             }
//             var messFile = __dirname + "/txt.txt";
//             //追加写入操作
//             fs.appendFile(messFile,message,(err)=>{
//                 if(err) throw err;
//                 console.log('saved');
//             })
//         })
//     })
// });

console.log('app started at port 3300');