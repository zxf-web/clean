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


//查询地址
router.get("/select_addr",function(req,res){
    const user_name=req.query.user_name;
    console.log(user_name);
    const sql="select site from address where address_user_id=(\
        select user_id from users where user_name=?)";
    con.query(sql,user_name,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})
//判断购物车是否存在此物件
router.get('/ifAdd',function(req,res){
    const user_name=req.query.user_name;
    const item_name=req.query.item_name;
    // console.log(item_name)
    const insert_sql="select * from clean_list where item_name=? and item_user_id=(select user_id from users where user_name=?);"
    // const insert_sql="select * from clean_list where item_name=?";
    const insert_sql_params=[item_name,user_name];
    con.query(insert_sql,insert_sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            if(result[0]){
                res.send(false);
            }else{
                res.send(true);
            }
        }
    })
});
//添加购物车
router.get('/add',function(req,res){
    const user_name=req.query.user_name;
    const item_name=req.query.item_name;
    const clean_way=req.query.clean_way;
    // console.log(item_name,clean_way);
    const select_sql="select * from things where thing_name=?";
    con.query(select_sql,item_name,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result)
            const item_thing_id=result[0].thing_id;
            const item_picture=result[0].thing_picture;
            const item_price=result[0].thing_price;
            const insert_sql="insert into clean_list values(null,?,?,?,?,1,?,\
                (select user_id from users where user_name=?)\
                )";
            const insert_params=[item_thing_id,item_name,item_picture,clean_way,item_price,user_name];
            con.query(insert_sql,insert_params,function(err,re){
                if(err){
                    throw err;
                }else{
                    res.send(true);
                }
            })
        }
    })
})

//查询清洗列表
router.post('/select',function(req,res){
    const user_name=req.body.user_name;
    const sql="select * from clean_list where item_user_id=(\
        select user_id from users where user_name=? \
    )";
    const sql_params=user_name;
    con.query(sql,sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})

//删除清洗列表
router.get('/delete',function(req,res){
    const id=req.query.id;
    const sql="delete from clean_list where item_id=?";
    const sql_params=id;
    con.query(sql,sql_params,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})

//修改购物车
router.get("/update",function(req,res){    
    const arr=req.query.arr;
    let arr1=[],arr2=[];
    for(let i=0;i<arr.length;i++){
        arr[i]=JSON.parse(arr[i]);
        arr1.push([arr[i].item_number,arr[i].item_id]);
    }
    // console.log(arr1);
    const sql="update clean_list set item_number=? where item_id=?";
    for(let item of arr1){
        con.query(sql,item,function(error){
            if(error){
                throw error;
            }
        })
        arr2.push(item[1]);
    }
    // console.log(arr2);
    //将改变了的清洗列表id返回给前台
    res.send(arr2);
})

/*--------导出路由--------*/
module.exports=router;