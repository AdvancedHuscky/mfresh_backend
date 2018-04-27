let product = require('./product')

module.exports = app=>{
  app.use('/product',product);
}