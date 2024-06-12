const mysql = require("mysql2");
//For Development
const myconn = mysql.createPool({
    user: process.env.user,
    password: process.env.password,
    host:"127.0.0.1",
    database:process.env.database,
    connectionLimit:20
})
// console.log(process.env.JWT_SECURT);
//For Production
// const myconn = mysql.createPool({    
//     host:process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASS,
//     database:process.env.MYSQL_DB,
//     connectionLimit:10
// })
module.exports = myconn.promise() 