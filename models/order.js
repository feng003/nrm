const db = require('../config/db');

const orders = db.defineModel('orders',{
    userId:db.INTEGER,
    amount:db.DECIMAL(10,2),
    sum:db.INTEGER,
    total:db.DECIMAL(10,2)
})

module.exports = {
    orders:orders
}