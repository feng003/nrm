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
const templating    = require('./lib/templating');
const rest          = require('./lib/rest');

let
    UserAuth  = model.UserAuth,
    User      = model.User,
    Message   = model.Message;

//(async () => {
    //var user = await User.create({
    //    name: 'John',
    //    gender: false,
    //    email: 'john-' + Date.now() + '@garfield.pet',
    //    passwd: 'hahaha'
    //});
    //console.log('created: ' + JSON.stringify(user));
    //var cat = await Pet.create({
    //    ownerId: user.id,
    //    name: 'Garfield',
    //    gender: false,
    //    birth: '2007-07-07',
    //});
    //console.log('created: ' + JSON.stringify(cat));
//})();

//log工具
const logUtil = require('./utils/log_util');

//app.use(session());
//middleware
app.use(async (ctx,next) => {
    //console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    var
        start = new Date().getTime(),
        execTime;
    try{
        //开始进入到下一个中间件
        await next();
        execTime = new Date().getTime() - start;
        logUtil.logResponse(ctx,execTime);
    } catch(error){
        execTime = new Date().getTime() - start;
        logUtil.logError(ctx,error,execTime);
    }

    ctx.response.set('X-Response-Time', `${execTime}ms`);
});

//注意顺序问题  parse request body:
app.use(bodyParser());

// static file support:
const isProduct = process.env.NODE_EV === 'production';
if (! isProduct) {
    let staticFiles = require('./lib/static-files');
    app.use(staticFiles('/static/', __dirname + '/static'));
}
// add nunjucks as view:
app.use(templating('views',{
    noCache:!isProduct,
    watch:!isProduct
}));

// bind .rest() for ctx:
app.use(rest.restify());
// add controllers:
app.use(controller());

let server = app.listen(3300);

const webSocket = require('ws');

const webSocketServer = webSocket.Server;
const wss = new webSocketServer({
    server: server
});

wss.on('connection',function(ws){
    ws.on('message',function(message){
        //console.log(`[SERVER] Received: ${message}`);
        ws.send(`${message}`,(err)=>{
            if(err){
                console.log(`[SERVER] error: ${err}`);
            }
            var messFile = __dirname + "/txt.txt";
            //追加写入操作
            fs.appendFile(messFile,message,(err)=>{
                if(err) throw err;
                console.log('saved');
            })
        })
    })
});

console.log('app started at port 3300');