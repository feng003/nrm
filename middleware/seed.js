
const model         = require('../lib/model');

let
    UserAuth  = model.userAuth,
    User      = model.user,
    Message   = model.message;
console.log(Message);
const seed = ()=>{
    return async (ctx,next) => {
        // var user = await User.create({
        //     name: 'John',
        //     gender: false,
        //     email: 'john-' + Date.now() + '@garfield.pet',
        //     passwd: 'hahaha'
        // });
        console.log('created: ' + User);
        // var Message = await Message.create({
        //     ownerId: user.id,
        //     name: 'Garfield',
        //     gender: false,
        //     birth: '2007-07-07',
        // });
        console.log('created: ' + Message);

        await next();
    }
}

module.exports = {
    seed:seed
}