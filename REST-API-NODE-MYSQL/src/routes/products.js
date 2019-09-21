const express=require('express');
const router=express.Router();

const mysqlConnection=require('../database');

router.get('/products', (req,res)=>{
      mysqlConnection.query('SELECT * FROM TblProduct LIMIT 10',(err, rows, fields)=>{
            if(!err){
                res.json(rows);
            }else{
                console.error(err);
            }
      });
});

router.get('/products/:id', (req, res)=>{
    const {id}=req.params;
     mysqlConnection.query('SELECT * FROM TblProduct WHERE TblProduct.idTblProduct=?',[id],(err,rows,fields)=>{
        if(!err){
            res.json(rows);
        }else{
            console.error(err);
        }
     });

    console.log(id);
});

module.exports=router; 