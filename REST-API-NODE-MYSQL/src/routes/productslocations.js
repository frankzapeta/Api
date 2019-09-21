const express=require('express');
const router= express.Router();
const servidorNotificacion= require('node-gcm');


const mysqlConnection=require('../database');




router.get('/productslocations/:idlocation/:name', (req, res) => {
    const {idlocation,name} = req.params;
    
    console.log(req.params);
    mysqlConnection.query('SELECT TblProduct.idTblProduct AS barCode, TblProduct.NameProduct AS nameProduct,'
    +'TbllocationlProduct.StockLocation AS stock FROM TblProduct INNER JOIN TblLocationlProduct ON TblProduct.idTblProduct = TblLocationlProduct.TblProduct_idTblProduct '
    +'WHERE TblLocationlProduct.TblLocation_idTblLocation=? AND TblProduct.NameProduct LIKE ? LIMIT 100',[idlocation,'%'+name+'%'],(err,rows,fields)=>{
        if (!err) {
                res.json(rows);
            }else{
                console.log(err);
            }
    });
       console.log(idlocation);
       console.log(name)
});

router.post('/productslocations',(req,res)=>{
    const {idTblProduct, idlocation, stock} = req.body;
    console.log(req.body);
    console.log(idTblProduct, idlocation,stock);
    const query = 'UPDATE TblLocationlProduct SET TblLocationlProduct.StockLocation=? WHERE TblLocationlProduct.TblLocation_idTblLocation=? AND TblLocationlProduct.TblProduct_idTblProduct=? ';
    mysqlConnection.query(query, [stock, idlocation, idTblProduct], (err, rows, fields) => {
        
        if(!err){
            res.json({Status: "200"});
        }else{
            console.log(err);
        }
    });
});

router.post('/productslocations/test', (req,res)=>{
   console.log(req.body);
});

router.get('/productslocations/bycode/:idlocation/:codigo',(req,res)=>{
          const {idlocation,codigo}=req.params;
          console.log(req.params);
          const query = 'SELECT TblProduct.idTblProduct AS barCode, TblProduct.NameProduct AS nameProduct, '
          +'TbllocationlProduct.StockLocation AS stock FROM TblProduct INNER JOIN TblLocationlProduct ON '
          +'TblProduct.idTblProduct = TblLocationlProduct.TblProduct_idTblProduct WHERE (TblProduct.idTblProduct=? OR TblProduct.TblProduct_idTblProduct=?)'
          +'AND TblProduct.Enable=true AND TblLocationlProduct.TblLocation_idTblLocation=? LIMIT 1';
            mysqlConnection.query(query,[codigo,codigo,idlocation], (err,rows,fields)=>{
                if(!err){
                    res.json(rows);
                }else{
                    console.log(err);
                }
            });
});

module.exports=router;