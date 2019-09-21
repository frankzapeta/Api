const express = require('express');
const router = express.Router();
const mysqlConnection=require('../database');

router.post('/pricesproduct/addprice', (req,res)=>{

    const {tipo,precio,nombreprecio,minsale,discount,def,enable,porcentaje,idProduct,idTypeCostumer}= req.body;
    console.log(req.body);
    const query = 'INSERT INTO TblPricesProduct(Type, Price, namePrice,minSale,DiscountPrice,Def,Enable,PercentageGain,TblProduct_idTblProduct,TblTypeCostumers_idTblTypeCostumers) '
    +'VALUES(?,?,?,?,?,?,?,?,?,?)';
    mysqlConnection.query(query,[tipo,precio,nombreprecio,minsale,discount,def,enable,porcentaje,idProduct,idTypeCostumer],(err,rows,fields)=>{
        if(!err){
            res.json({"Estatus":200});
        }else{
            console.log(err);
        }
    });

});

module.exports = router;