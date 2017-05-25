
const model         = require('../lib/model');

let
    UserAuth  = model.userAuth,
    User      = model.user,
    Message   = model.message;

const seed = ()=>{
    return async (ctx,next) => {
        var user = await User.create({
            name: 'John',
            gender: false,
            email: 'john-' + Date.now() + '@garfield.pet',
            passwd: 'hahaha'
        });
        console.log('created: ' + JSON.stringify(user));

        await next();
    }
}

module.exports = {
    seed:seed
}