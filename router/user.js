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
//用户登录接口
router.post("/login",function(req,res){
    //接收前端传递过来的参数
    // console.log(req.body);
    const username=req.body.username;
    const password=req.body.password;
    const sql="select * from users where user_name=? and user_password=?;";
    con.query(sql,[username,password],function(err,result){
        if(err){
            throw err;
        }else{
            // console.log(sql);
            // console.log(result);
            // session.user_id=result[0].user_id;
            
            res.send(result);
        }
    })
})
//用户注册接口
router.post('/register',function(req,res){
    //接收前端传递过来的参数
    const username=req.body.username;
    const password=req.body.password;
    const telephone=req.body.telephone;
    const email=req.body.email;
    const select_sql="select * from users where user_name=?";
    con.query(select_sql,username,function(err,result){
        if(err){
            throw err;
        }else{
            if(result[0]){
                res.send(false);
            }else{
                const insert_sql=`insert into users values(null,?,null,?,?,?)`;
                const insert_params=[username,password,telephone,email];
                con.query(insert_sql,insert_params,function(error,re){
                    if(error){
                        throw error;
                    }else{
                        res.send(true);
                    }
                })
            }
        }
    })
})
//会员手机号查询
router.get("/member_register_select",function(req,res){
    const user_name=req.query.user_name;
    
    const sql="select user_phone from users where user_name=?";
    con.query(sql,user_name,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
//会员注册
router.post("/member_register",function(req,res){
    const phone=req.body.number;
    // console.log(phone);
    const username=req.body.username;
    const sql="select user_id from users where user_name=?";
    con.query(sql,username,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            const select_sql="select * from members where member_user_id=?";
            con.query(select_sql,result[0].user_id,function(e,r){
                if(e){
                    throw e;
                }else{
                    if(r[0]){
                        res.send(false);
                    }else{
                        const inser_sql="insert into members values(null,?,?,?,1,0)";
                        con.query(inser_sql,[result[0].user_id,"普通会员",phone],function(err,re){
                            if(err){
                                throw err;
                            }else{
                                res.send(true);
                            }
                        })
                    }
                }
            })
        }
    })
})
/*--------导出路由--------*/
module.exports=router;