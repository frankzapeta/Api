const mysql = require('mysql');
 
const mysqlConnection=mysql.createConnection({
     host:'localhost',
     port:'3306',
     user:'barrie',
     password:'server',
     database:'BussinesUP'
});

mysqlConnection.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log('DB conectada');
    }
});

module.exports=mysqlConnection;