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

//管理员登录
router.post("/login",function(req,res){
    const name=req.body.account;
    const password=req.body.password;
    // console.log(name,password);
    const sql="select * from admin where name=? and password=?";
    const sql_params=[name,password];
    con.query(sql,sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
/*------------物件------------- */
//查询物件
router.get('/select_clean_things',function(req,res){
    const sql="select * from things ";
    con.query(sql,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//删除物件
router.get('/delete_thing',function(req,res){
    const item_id=req.query.id;
    const sql="delete from clean_list where item_id=?";
    con.query(sql,item_id,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//修改清洗物件
router.get("/update_thing",function(req,res){
    // console.log(req.query);
    const thing_id=req.query.thing_id;
    const thing_price=req.query.thing_price;
    const update_sql_params=[thing_price,thing_id];
    const sql="update things set thing_price=? where thing_id=?;";
    con.query(sql,update_sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
/*------------订单------------- */
//查询订单
router.get('/select_invoice',function(req,res){
    const sql="select * from orders";
    con.query(sql,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
});
//删除订单
router.get('/delete_invoice',function(req,res){
    const order_id=req.query.id;
    const sql="delete from orders where order_id=?";
    con.query(sql,order_id,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
/*------------用户------------- */
//查询用户
router.get('/select_user',function(req,res){
    const sql="select * from users";
    con.query(sql,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
//删除用户
router.get('/delete_user',function(req,res){
    const user_id=req.query.id;
    const sql="delete from users where user_id=?";
    con.query(sql,user_id,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//修改用户
router.get("/update_user",function(req,res){
    // console.log(req.query);
    const user_id=req.query.user_id;
    const user_phone=req.query.user_phone;
    const user_email=req.query.user_email;
    const update_sql_params=[user_phone,user_email,user_id];
    const sql="update users set user_phone=?,user_email=? where user_id=?;";
    con.query(sql,update_sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
/*------------会员------------- */
//查询会员
router.get('/select_member',function(req,res){
    const sql="select users.user_name,members.member_id,members.member_level,\
                members.member_card_number,members.member_account,\
                members.member_points from users,members\
                where users.user_id=members.member_user_id;";
    con.query(sql,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
//删除会员
router.get('/delete_member',function(req,res){
    const member_id=req.query.id;
    const sql="delete from members where member_id=?";
    con.query(sql,member_id,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//修改会员
router.get("/update_member",function(req,res){
    console.log(req.query);
    const member_id=req.query.member_id;
    const level=req.query.level;
    const points=req.query.points;
    const account=req.query.account;
    const update_sql_params=[level,account,points,member_id];
    const sql="update members set member_level=?,member_account=?,member_points=?  where member_id=?;";
    con.query(sql,update_sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
//增加积分
router.post("/pointsAdd",function(req,res){
    const user_name=req.body.user_name;
    console.log(user_name)
    const sql="update members set member_points=member_points+10 where member_user_id=(select user_id from users where user_name=?);"
    // const points_sql="select member_points from members where member_user_id=(select user_id from users where user_name=?)";
    con.query(sql,user_name,function(err,result){
        if(err){
            throw err;
        }
    })
})
//查询会员账户余额
router.get("/member_account",function(req,res){
    const user_name=req.query.user_name;
    // console.log("名字：",user_name);
    const sql="select member_account from members where member_user_id=(select user_id from users where user_name=?)";
    con.query(sql,user_name,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log("名字：",result[0]);
            if(!result[0]){
                res.send(false);
            }else{
                res.send(result);
            }
            
        }
    })
})
//减少账户余额
router.get("/member_account_decrease",function(req,res){
    const spend=req.query.spend;
    const user_name=req.query.user_name;
    // console.log(spend,user_name);
    const sql="update members set member_account=member_account- ? \
    where member_user_id=(select user_id from users where user_name=?)";
    con.query(sql,[spend,user_name],function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//增加账户余额
router.get("/member_account_increase",function(req,res){
    const user_name=req.query.user_name;
    const money=req.query.money;
    // console.log(user_name,money)
    const sql="update members set member_account=member_account+ ? \
    where member_user_id=(select user_id from users where user_name=?)";
    con.query(sql,[money,user_name],function(err,result){
        if(err){
            throw err;
        }else{
            res.send(result);
        }
    })
})
/*--------导出路由--------*/
module.exports=router;