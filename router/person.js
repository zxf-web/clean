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

/* 创建接口 */
//查询用户表用户信息
router.get('/select',function(req,res){
    const user_name=req.query.user_name;
    const sql="select * from users where user_name=?";
    con.query(sql,user_name,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})

//查询会员表对应用户等级
router.get("/select_member_id",function(req,res){
    // console.log(req.member_user_id);
    const member_user_id=req.query.member_user_id;
    const sql="select member_level from members where member_user_id=?";
    con.query(sql,member_user_id,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})

//修改用户信息
router.get("/update",function(req,res){
    const o_user_name=req.query.o_user_name;
    const n_user_name=req.query.n_user_name;
    const n_user_password=req.query.n_user_password;
    const sql="update users set user_name=? , user_password=? where user_name=?";
    const update_params=[n_user_name,n_user_password,o_user_name];
    con.query(sql,update_params,function(err,result){
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
})

/*--------导出路由--------*/
module.exports=router;