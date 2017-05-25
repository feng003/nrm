//log工具
const logUtil = require('../utils/log_util');

const log = () => {
    return async(ctx,next) =>{
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
    }
}

module.exports = log;