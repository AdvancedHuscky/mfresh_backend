var express = require('express');
var pool = require('../pool');
var router = express.Router();

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
// /news/select?pageNum=1 返回指定页码的数据
router.get('/select', (req, res) => {
    //准备要返回的数据
    let myResult = {
        totalRecord: 0,
        pageSize: 5,//约定每次加载5条数据
        pageCount: 1,
        pageNum: 1,
        data: []
    }
    let countReady = false;
    let dataReady = false;

    //1、获取一共有多少条数据
    var sql1 = "SELECT COUNT(*) as c FROM mf_news";
    pool.query(sql1,(err,result)=>{
        console.log(result[0].c);
        //保存 totalRecord: 0,
        myResult.totalRecord = 
            result[0].c;
        myResult.pageCount = 
        Math.ceil(myResult.totalRecord/myResult.pageSize);
        countReady = true;
        if(dataReady){
            res.json(myResult);
        }
    })

    //2、从pageNum开始读取5条数据 保存在data中
    var pageNum = req.query.pageNum;
    if(!pageNum){
        pageNum = 1;
    }else{
        pageNum = parseInt(pageNum);
    }
    var sql2 = "SELECT * FROM mf_news ORDER BY pubTime DESC LIMIT ?,?"
    pool.query(sql2,[(pageNum-1)*5,5],(err,result)=>{
        console.log(result);
        myResult.data = result;
        myResult.pageNum = pageNum;
        dataReady = true;
        if(countReady){
            res.json(myResult);
        }
    })

});

// 如何在nodejs调用mysql时 一次执行多条sql语句
router.get('/list',(req,res)=>{
   //①允许一次执行多条
   //②执行sql
   //准备要返回的数据
    let myResult = {
        totalRecord: 0,
        pageSize: 5,//约定每次加载5条数据
        pageCount: 1,
        pageNum: 1,
        data: []
    }
   var sql = "SELECT COUNT(*) as c FROM mf_news;SELECT * FROM mf_news ORDER BY pubTime DESC LIMIT ?,?";
    var pageNum = req.query.pageNum;
    if(!pageNum){
        pageNum = 1;
    }else{
        pageNum = parseInt(pageNum);
    }
   pool.query(sql,[(pageNum-1)*5,5],(err,results)=>{
       myResult.totalRecord = results[0][0].c;
       myResult.pageCount = Math.ceil(myResult.totalRecord/5);
       myResult.data = results[1];
       myResult.pageNum = pageNum;
       res.json(myResult);
   });
})

module.exports = router;