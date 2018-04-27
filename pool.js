let mysql = require('mysql');
let pool = mysql.createPool({
  user:'root',
  password:'',
  database:'mfresh',
  connectionLimit:5,
  multipleStatements:true
})
module.exports = pool;