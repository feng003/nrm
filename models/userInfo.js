
const db = require('../config/db');

const userInfo = db.defineModel('user_info',{
    uid:{
        type:db.INTEGER,
        unique: true
    },
    province:db.STRING,
    city:db.STRING,
    county:db.STRING,
    address:db.STRING
})