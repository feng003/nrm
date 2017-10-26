/**
 * Created by zhang on 2016/12/14.
 */

    const db = require('../config/db');

    const messages = db.defineModel('messages', {
        email: {
            type: db.STRING(100),
            unique: true
        },
        username:db.STRING(32),
        title: db.STRING(100),
        context: db.TEXT
    });

    const addMessages = async function(data){
        await messages.create({
            id:data.id,
            username:data.username,
            title:data.title,
            context:data.context,
            email:data.email
        },{'where':{id:data.id}});

        return true
    };

    const updateMessages = async function(data){
        await messages.create({
            id:data.id,
            username:data.username,
            title:data.title,
            context:data.context,
            email:data.email
        },{'where':{id:data.id}});

        return true
    };

    module.exports = {
        messages,
        addMessages,
        updateMessages
    };



