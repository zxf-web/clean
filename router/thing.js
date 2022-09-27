/*---------------------数据库连接---------------------*/
//导入自定义数据库模块
var my=require('./mysql.js');
var con=my();

/*--------导入第三方模块express(前后端数据交互)-------------*/
var express=require('express');
//调用express中的Router函数，创建路由对象
var router=express.Router();
//导入服务端存储的第三方模块express-session
var session=require("express-session");


//查询衣物
router.get("/select_clothes",function(req,res){
    const thing_form=req.query.thing_form;
    const sql="select * from things where thing_form=?";
    con.query(sql,thing_form,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//查询鞋靴
router.get("/select_shoes",function(req,res){
    const thing_form=req.query.thing_form;
    const sql="select * from things where thing_form=?";
    con.query(sql,thing_form,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//查询家纺
router.get("/select_texiles",function(req,res){
    const thing_form=req.query.thing_form;
    const sql="select * from things where thing_form=?";
    con.query(sql,thing_form,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//查询品牌
router.get("/select_brands",function(req,res){
    const thing_form=req.query.thing_form;
    const sql="select * from things where thing_form=?";
    con.query(sql,thing_form,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})

/*--------导出路由--------*/
module.exports=router;