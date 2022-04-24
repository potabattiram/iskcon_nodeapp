var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit: 20,
  host: "remotemysql.com",
  port: 3306,
  user: "vLGAtpQiCG",
  password: "y8blMNVpZ6",
  database: "vLGAtpQiCG",
  port: 3306,
});

pool.getConnection(function(err, connection) {
  connection.query('SELECT * FROM Towels_Data limit 1', function (error, results, fields) {
    connection.release();
    if (error) throw error;
    else if(results){
      
      console.log("Connected & Data Available")
    }
  });
});
module.exports = pool;
