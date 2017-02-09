/**
 * Created by zhang on 2016/12/13.
 */

//加密函数
const cryptoFun = require('../config/cryptoFun');
const model = require('../model');
const User  = model.User;

const fn_admin = async(ctx,next)=>{
    var admin = cryptoFun.cryptoMd5('admins');
    ctx.render('admin.html',{
        title:admin
    });
};

const fn_logout = async(ctx,next)=>{
    ctx.session.username = null;
    ctx.redirect('/admin');
    ctx.status = 301;
};

const fn_doAdmin = async(ctx,next)=>{
    var data = {},
        username = ctx.request.body.name || "",
        passwd   = ctx.request.body.pwd || "";
        passwd = cryptoFun.cryptoMd5(passwd);
    await User.findOne({'where':{'name':username,'passwd':passwd}}).then(function(msg){
        data = msg.dataValues;
    });
    if(data){
        ctx.session.username = data.name;
        ctx.redirect('/message');
        ctx.status = 301;
    }else{
        ctx.redirect('/admin');
        ctx.status = 301;
    }
};

module.exports = {
    'GET /admin':fn_admin,
    'GET /logout':fn_logout,
    'POST /doAdmin':fn_doAdmin
};
