let express = require('express');
let morgan = require('morgan');
let compression = require('compression');
let bodyParser = require('body-parser');
let pool = require('./pool');
let fs = require('fs');
let router = require('./routes/index')

const app = express();
app.listen(3000,()=>{
  console.log('listening on 3000 port');
})
app.use(bodyParser.urlencoded({extended:false}));
app.use(compression());
let nowDate = new Date();
let fileName = nowDate.getFullYear()+"-"+(nowDate.getMonth()+1)+'-'+nowDate.getDate()+'.log';
let logStream = fs.createWriteStream(__dirname+'/logs/'+fileName,{flags:'a'});
app.use(morgan('tiny',{stream:logStream}));
router(app);
app.get('/',(req,res)=>{
  res.send('ok')
})
