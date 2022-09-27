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
//查询地址
router.get("/select",function(req,res){
    const address_user_name=req.query.address_user_name;
    // console.log(address_user_name);
    const sql="select * from address where address_user_id=\
    (select user_id from users where user_name=?)";
    con.query(sql,address_user_name,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//修改地址
router.get("/exit",function(req,res){
    const address_id=req.query.aid;
    const address_user_name=req.query.username;
    const telephonenumber=req.query.telephone;
    const site=req.query.address;
    const sql="update address set address_user_name=?,telephonenumber=?,site=? where address_id=?";
    const sql_params=[address_user_name,telephonenumber,site,address_id];
    con.query(sql,sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//添加地址
router.get("/add",function(req,res){
    const address_user_name=req.query.address_user_name;
    const addressee=req.query.addressee;
    const numberphone=req.query.numberphone;
    const to_address=req.query.to_address;
    const select_sql="select user_id from users where user_name=?";
    con.query(select_sql,address_user_name,function(error,result){
        if(error){
            throw error;
        }else{
            //console.log(result);
            const address_user_id=result[0].user_id;
            const sql="insert into address values(null,?,?,?,?)";
            const insert_sql_params=[addressee,to_address,numberphone,address_user_id];
            con.query(sql,insert_sql_params,function(err,re){
                if(err){
                    throw err;
                }else{
                    res.send(re);
                }
            })

        }
    })
})
//删除地址
router.get("/delete",function(req,res){
    const address_id=req.query.id;
    const sql="delete from address where address_id=?";
    con.query(sql,address_id,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
/*--------导出路由--------*/
module.exports=router;