let product = require('./product')
let news = require('./news')

module.exports = app=>{
  app.use('/product',product);
  app.use('/news',news);
}