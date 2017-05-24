/**
 * Created by zhang on 2016/12/30.
 */

    const url   = require('url');
    const model = require(process.cwd() + '/lib/model');
    var   Message = model.Message;

    var fn_message = async(ctx,next)=>{
        // console.log(ctx.session.username);
        if(ctx.session.username != 'admin')
        {
            ctx.redirect('/admin');
            ctx.status = 301;
        }
        var data = await Message.findAll({order:[['username','DESC']]});

        var msg = [];
        for(var v in data){
            msg[v] = data[v]['dataValues'];
            //console.log(msg);
        }
        //console.log('message '+ JSON.stringify(ctx.response));
        ctx.render('message.html',{'title':'message','msg':msg});
    };

    var fn_addMessage = async(ctx,next)=>{
        //console.log('message '+ JSON.stringify(ctx.request));
        var username = ctx.request.body.username || "",
            title    = ctx.request.body.title || "",
            context  = ctx.request.body.context || "",
            email    = ctx.request.body.email || "";

        var data = await Message.create({
            email:email,
            username:username,
            title:title,
            context:context
        }).then(function(p){
            console.log('created.' + JSON.stringify(p));
        }).catch(function(err){
            console.log('failed: '+ err);
        });
        ctx.redirect('/message');
        ctx.status = 301;
        //await next();
    };
    var fn_deleteMessage = async(ctx,next)=>{
        var id = ctx.params.id;
        var　num = await Message.destroy({'where':{'id':id}});
        ctx.redirect('/message');
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

    var fn_editDoMessage = async(ctx,next)=>{
        var id = ctx.request.body.id,
            username = ctx.request.body.username || "",
            title    = ctx.request.body.title || "",
            context  = ctx.request.body.context || "",
            email    = ctx.request.body.email || "";

        await Message.update({id:id,username:username,title:title,context:context,email:email},{'where':{id:id}})
                .then(function(data){
                    console.log(data);
                }).catch(function(err){
                    console.log(err);
                });
        ctx.redirect('/message');
        ctx.status = 301;
    };

    module.exports = {
        'GET /message':fn_message,
        'GET /deleteMessage/:id':fn_deleteMessage,
        'GET /editMessage/:id':fn_editMessage,
        'POST /addMessage':fn_addMessage,
        'POST /editDoMessage':fn_editDoMessage
    };
