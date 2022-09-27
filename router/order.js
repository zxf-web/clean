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
//查询订单表
router.post('/select',function(req,res){
    const user_name=req.body.user_name;
    const sql="select * from orders where order_user_name=?";
    con.query(sql,user_name,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
//单个买加入购物车
router.get("/add",function(req,res){
    const user_name=req.query.user_name;
    const thing_name=req.query.thing_name;
    const clean_ways=req.query.clean_ways;
    const spend=req.query.spend;
    const count=req.query.count;
    // console.log(spend,clean_ways,thing_name,user_name);
    const select_sql="select thing_picture,thing_price from things where thing_name=?";
    con.query(select_sql,thing_name,function(err,result){
        if(err){
            throw err;
        }else{
            // console.log(result[0].thing_picture);
            // console.log(result[0].thing_price);
            // console.log(result[0]);
            let timer=new Date();
            const order_time=timer.toLocaleString();
            const insert_sql="insert into orders values(null,?,?,?,?,1,?,?,?,?)";
            const insert_sql_params=[
                user_name,thing_name,
                result[0].thing_picture,result[0].thing_price,
                spend,clean_ways,order_time,"确认完成"
            ];
            con.query(insert_sql,insert_sql_params,function(error,re){
                if(error){
                    throw error;
                }else{
                    res.send(re);
                }
            })
        }
    })
})
//清洗列表中买后加入购物车
router.get("/addList",function(req,res){
    const purchase=req.query.purchase;
    const user_name=req.query.user_name;
    const discount=req.query.discount;
    let timer=new Date();
    const order_time=timer.toLocaleString();
    for(let i=0;i<purchase.length;i++){
        const select_sql="select * from clean_list where item_id=?";
        con.query(select_sql,Number(purchase[i]),function(err,result){
            if(err){
                throw err;
            }else{
                // console.log(result);
                const insert_order_sql="insert into orders values(null,?,?,?,?,?,?,?,?,?)";
                const insert_order_sql_params=[
                    user_name,result[0].item_name,result[0].item_picture,result[0].item_price,
                    result[0].item_number,result[0].item_number*result[0].item_price*discount,
                    result[0].clean_way,order_time,"确认完成"
                ];
                con.query(insert_order_sql,insert_order_sql_params,function(error){
                    if(error){
                        throw error;
                    }
                })
            }
        })
    }
    res.send(true);
})
//确认订单
router.get("/order_status",function(req,res){
    const order_id=req.query.id;
    // console.log(order_id);
    const sql=" update orders set order_status='已完成' where order_id=?;";
    con.query(sql,order_id,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
/*--------导出路由--------*/
module.exports=router;