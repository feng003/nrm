//动态配置 模板目录
const nunjucks = require('nunjucks');

function createEnv(path,opts)
{
    var autoescape = opts.autoescape && true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path.slice(1,),{noCache:noCache,watch:watch,}),
            {autoescape:autoescape,throwOnUndefined:throwOnUndefined});
    if(opts.filters)
    {
        for(var f in opts.filters){
            env.addFilter(f,opts.filters[f]);
        }
    }
    return env;
}

// add nunjucks as view:
const catalog = () =>{
    return async (ctx,next)=>{

        var url  = ctx.url,
            path = '';
        var urlStr = url.split('/')[1];
        if(urlStr === 'admin')
        {
            path = '/views/admin';
        }else if(urlStr === 'home'){
            path = '/views/home';
        }else{
            path = '/views';
        }

        const isProduct = process.env.NODE_EV === 'production';
        var opts = {noCache:!isProduct,watch:!isProduct};
        // console.log(path + JSON.stringify(opts));
        var env  = createEnv(path,opts);
        // (function(){
            ctx.render = function(view,model){
                ctx.response.body = env.render(view,Object.assign({},ctx.state || {},model||{}));
                ctx.response.type = 'text/html';
            };
        // }());

        await next();
    }
}

module.exports = catalog;