/**
 * Created by zhang on 2016/12/13.
 */

//加密函数
const ROOT_PATH = process.cwd();
const cryptoFun = require(ROOT_PATH +'/config/cryptoFun');
const model = require(ROOT_PATH +'/lib/model');
const User  = model.user;

const fn_admin = async(ctx,next)=>{
    var admin = cryptoFun.cryptoMd5('admins');
    // ctx.session.username = admin;
    // console.log(ctx.session.username);
    ctx.render('admin.html',{
        title:admin,
        'username':ctx.session.username
    });
};

const fn_index = async(ctx,next)=>{
    if(!ctx.session.username)
    {
        ctx.redirect('/admin');
        ctx.status = 301;
    }

    ctx.render('index.html',{
        title:ctx.session.username
    })
}

const fn_logout = async(ctx,next)=>{
    ctx.session.username = null;
    console.log(ctx.session.username);
    ctx.redirect('/admin');
    ctx.status = 301;
};

const fn_doAdmin = async(ctx,next)=>{
    var data = {},
        username = ctx.request.body.name || "",
        passwd   = ctx.request.body.pwd || "";
        passwd = cryptoFun.cryptoMd5(passwd);
    await User.findOne({'where':{'name':username,'passwd':passwd}})
        .then(function(msg){
            if(msg){
                data = msg.dataValues;
            }
    }).catch(function(err){
        data = err;
    });

    if(data){
        ctx.session.username = data.name;
        ctx.redirect('/admin/index');
        ctx.status = 301;
    }else{
        ctx.redirect('/admin');
        ctx.status = 301;
    }
};

module.exports = {
    'GET /admin':fn_admin,
    'GET /admin/index':fn_index,
    'GET /admin/logout':fn_logout,
    'POST /admin/doAdmin':fn_doAdmin
};
