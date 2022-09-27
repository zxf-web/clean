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
/* -----------会员------------- */
router.get('/member_statistic',function(req,res){
    const sql="select count(if(member_level=?,true,null)) as common,\
    count(if(member_level=? ,true,null)) as gold,\
    count(if(member_level=?,true,null)) as white,\
    count(if(member_level=?,true,null)) as purple \
    from members;"
    const sql_params=['普通会员','黄金会员','白金会员','紫金会员'];
    con.query(sql,sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
/* -----------物件------------- */
router.get('/thing_statistic',function(req,res){
    const sql="select count(if(thing_form=?,true,null)) as clothes,\
    count(if(thing_form=? ,true,null)) as shoes,\
    count(if(thing_form=?,true,null)) as texiles,\
    count(if(thing_form=?,true,null)) as brand \
    from things;"
    const sql_params=[1,2,3,4];
    con.query(sql,sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
/* -----------订单------------- */
router.get("/order_statistic",function(req,res){
    const select_thing_sql="select thing_name from things;";
    con.query(select_thing_sql,function(err,result){
        
        if(err){
            throw err;
        }else{
            let arr=[];
            // console.log(result);
            for(item of result){
                let select_order_sql="select count(*) as ? from orders where order_thing_name=?";
                let select_order_sql_params=[item.thing_name,item.thing_name];
                con.query(select_order_sql,select_order_sql_params,function(error,re){
                    if(error){
                        throw error;
                    }else{
                        arr.push(re[0]);
                        if(arr.length==result.length){
                            // console.log(arr);
                            res.send(arr);
                        }
                        //res.send(result);//使用会报错Cannot set headers after they are sent to the client(因为一次请求多次响应)
                    }
                })
            }
        }
    })
})
/*--------导出路由--------*/
module.exports=router;