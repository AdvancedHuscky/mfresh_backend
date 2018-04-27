/**
*按发布时间逆序返回新闻列表
*请求参数：
  pageNum-需显示的页号；默认为1
*输出结果：
  {
    totalRecord: 58,
    pageSize: 10,
    pageCount: 6,
    pageNum: 1,
    data: [{},{} ... {}]
  }
*/
let express = require('express');
let pool = require('../pool');
let news = express.Router();

news.get('/select',(req,res)=>{
  let myResult = {
    totalRecord: 0,
    pageSize: 5,//约定每次加载5条数据
    pageCount: 1,
    pageNum: 1,
    data: []
  }
  //aquire the total count of data
  let sql_count = 'SELECT COUNT(*) AS count_all FROM mf_news';
  pool.query(sql_count,(err,result)=>{
    myResult.totalRecord = result[0].count_all;
  })
  //save data which sent from backend into data-ARRY
  let pageNum 
  pool.query('SELECT * FROM mf_news ORDER BY pubTime',(err,result)=>{
      res.json(result);
  })
})
//how to execute some mysql scripts
news.get('/list',(req,res)=>{
  let sql = "SELETCT COUNT(*) AS count FROM mf_news;SELECT * FROM mf_news ORDER BY pubTime DESC LIMIT ?,?";
  pool.query(sql,[0,5],(err,results)=>{
    console.log(results)
  })
})
module.exports = news;