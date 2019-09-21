const express= require('express');
const router = express.Router();



const mysqlConnections= require('../database');

router.get('/locations', (req,res)=>{
    mysqlConnections.query('SELECT * FROM TblLocation',(err,rows,fields)=>{
          if(!err){
            console.log(rows);
            res.json(rows);
          }else{
             console.error(err);
          }
    });



});

module.exports = router;

