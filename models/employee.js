
const db = require('../config/db');

const employees = db.defineModel('employees',{
    name:db.STRING,
    workDate:db.DATEONLY,
    dailyPages:db.INTEGER
})

module.exports = {
    employees:employees
}