let express = require('express');
let pool = require('./pool');


let app = express();
app.listen(3000,()=>{
  console.log('listening on 3000 port');
})

