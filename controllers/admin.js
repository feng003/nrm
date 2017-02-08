/**
 * Created by zhang on 2016/12/13.
 */

//加密函数
const cryptoFun = require('../config/cryptoFun');


var fn_admin = async(ctx,next)=>{
    var admin = cryptoFun.cryptoMd5('admins');
    this.session = '2';
    console.log(this.session);
    ctx.render('admin.html',{
        title:admin
    });
};

module.exports = {
    'GET /admin':fn_admin
};
