let express = require('express');
let product = express.Router();

product.get('/list',(req,res)=>{
  res.send('this is product list')
})

module.exports = product;