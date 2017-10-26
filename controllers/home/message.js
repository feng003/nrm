/**
 * Created by zhang on 2016/12/30.
 */

    const url   = require('url');
    const model = require(process.cwd() + '/lib/model');
    var   Message = model.message;

    var fn_message = async(ctx,next)=>{
        var data = await Message.findAll({order:[['username','DESC']]});
        var msg = [];
        for(var v in data){
            msg[v] = data[v]['dataValues'];
            // console.log(msg);
        }
        console.log('message '+ JSON.stringify(ctx.response));
        ctx.render('message.html',{'title':'message','msg':msg});
    };

    var fn_addMessage = async(ctx,next)=>{
        var data = [];
        data['username'] = ctx.request.body.username || "";
        data['title'] = ctx.request.body.title || "";
        data['context'] = ctx.request.body.title || "";
        data['email'] = ctx.request.body.email || "";

        const rs = await Message.addMessages(data);
        ctx.redirect('/home/message');
        ctx.status = 301;
    };

    var fn_deleteMessage = async(ctx,next)=>{
        var id = ctx.params.id;
        var　num = await Message.destroy({'where':{'id':id}});
        ctx.redirect('/home/message');
        ctx.status = 301;
    };

    var fn_editMessage = async(ctx,next)=>{
        var id   = ctx.params.id;
        var data = {};
        await Message.findOne({'where':{'id':id}}).then(function(msg){
            data = msg.dataValues;
        });
        ctx.render('editMessage.html',{'title':'editMessage','msg':data});
    };

    const fn_editDoMessage = async(ctx,next)=>{
        const data = [];
        data['id'] = ctx.request.body.id;
        data['username'] = ctx.request.body.username || "";
        data['title'] = ctx.request.body.title || "";
        data['context'] = ctx.request.body.context || "";
        data['email'] = ctx.request.body.email || "";

        const rs = await Message.updateMessages(data);
        ctx.redirect('/home/message');
        ctx.status = 301;
    };

    module.exports = {
        'GET /home/message':fn_message,
        'GET /home/deleteMessage/:id':fn_deleteMessage,
        'GET /home/editMessage/:id':fn_editMessage,
        'POST /home/addMessage':fn_addMessage,
        'POST /home/editDoMessage':fn_editDoMessage
    };
