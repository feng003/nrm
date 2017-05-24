
const db = require('../config/db');

const customers = db.defineModel('customers',{
    name:db.STRING,
    age:db.INTEGER,
    address:db.STRING,
    salary:db.DECIMAL(10,2)
})

module.exports = {
    customers:customers
}
