let mysql = require('mysql');
require('dotenv/config');
const config ={
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database
  };
const connection = mysql.createConnection(config);
module.exports=connection;
//don't show the log when it is test



