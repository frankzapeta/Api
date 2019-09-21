const express= require('express');
const app=express();
const morgan= require('morgan');
const bodyParser = require('body-parser');


app.use(morgan('short'));


//settings
app.set('port',process.env.PORT || 3000);
//middlewares 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//routes

app.use(require('./routes/products')); 
app.use(require('./routes/locations'));
app.use(require('./routes/productslocations'));
app.use(require('./routes/pricesproduct'));

//starting the server
app.listen(app.get('port' ),()=> {
    console.log('server on port',app.get('port'));   
});