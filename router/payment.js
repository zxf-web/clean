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
//查找清洗物件
router.get("/select_thing",function(req,res){
    const thing_name=req.query.thing_name;
    const sql="select thing_price from things where thing_name=?";
    con.query(sql,thing_name,function(error,result){
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})
//查找会员等级
router.get("/member_level",function(req,res){
    const user_name=req.query.user_name;
    // console.log(user_name);
    const sql="select member_level from members where member_user_id=\
    (select user_id from users where user_name=?)";
    con.query(sql,user_name,function(error,result){
        if(error){
            throw error;
        }else{
            // console.log(result);
            res.send(result);
        }
    })
})




//账号：xrrjck8247@sandbox.com
//1.引入支付宝的sdk
const Alipaysdk=require("alipay-sdk").default;
//2.引入支付宝的sdk
const alipay=new Alipaysdk({
    appId:2021000121659957,
    gateway:'https://openapi.alipaydev.com/gateway.do',
    alipayPublicKey:"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgFNpSMt4sfD6dD1IYdRrI3J27VABUJTJGJRqNhHvQ4OORfN2JykHPd3XlHGsMRpo7KrynzRJT1WgEgZCetM0W56KQMjyq5cAu1raPb80IfXFcXg7KfWliC1N9PqRumErztz7zKSqkG4Nys56R8/fVTUdlgKvLEEf0y5hnUdPrrd6b60EiDRNCqjgSe0jnskSriIDxQhL90YL80UVIRPq0658c+56lHwLP90LifZiGODSpvlbLt+cZdWzp67555QtXbuT/KBRT95ZHEzDvVirIRMIXfytXw7XXCs19BjMBHbFKRiuN9aterOhwrS8Jv3bvIlF3544G8ariz5/Ex0PtwIDAQAB",
    privateKey:"MIIEowIBAAKCAQEAp0IIR2kn2tzqrj9zZTNdm5obdfSfdM0V4scRNUZpudtOdcEUoRV8xqIDkQdzNH2n3XrCrW9oKBNzx1GJRu6OlVCw0f/op+qt55SfiLEzdxIB1QKLypg7+nx+QZ8g8zxxitkIIEtYoA+NrYTqgphKM5SmyyyeZBJhmpBzBCE0VMnSFtjDSd3IatSBqelTSqnqOHrxEKyH21rjcS/nMC5/4J3f3j/ZMPeXp8YBoIbp7nCapMwystmLJrlwzH89khmf8Tsu1KB84xXm8J065FONlt5sihj5cbLI9JsDQuQ7viAYgZvVW14DTxTaa6Jad00wDe+y4y7lrp4kFCOO945fOQIDAQABAoIBAQCUeCIfObH+LsJHgN1vRQRf/pFHyKjPJsm5r5mP3/wz1f+0uXsVbpx/OgvObn2OZ8hd6v3qtI0RngrVMISaKWL6GlGLaA3fGIvcmOpwjVOw65QiwIrUgQQk2uO8XoQCRnJHnVYATMHT+1p5YBZHbOXZGahhjC7hiAuKB5WBYfQxGjJuOvWYTg0LDpVHdrZSxe68tUmypNG3P+kJYP95TYWJ2D15/cDNkThoAJOrfH9oBI/lsB4YaF252h6l6VAdmeJqw1YdhoSA7IPa7DnSjgnxfkVL+AppH2id2ZrRzYX49xdc7VFUK42Z8kkbCsYpxdpi9KF21hdl1xOnc0KR1rQBAoGBANKcPVAxerMU7EitwGF60OmBuGhHK4fN8qb86JZpjwxBikEtL2FfLkiqWasC7RBAeMsR3RWRuJg9YGd9pmLbN9RmKiNBOYBILtUmgufuF4AoDsWfflU/FUKyJaWAd92DDC8lqK4JSWOw1k5Pj7vhuUQpALOfDvY7d3pN+1Pkm0C5AoGBAMtN9lfPl0NcLxQGXWHOqs3OUNT+3L62lQ3cO1el7VLpJshgcQQp6TZgepfSezJg5KNeo2QCtvddJwbVs3jLY28n7I6CZDo8nNjSpxWg4N4Acx1PrZM8xuP0SWbzSh6vZ7aqR8h/BObG1K3xm7iVo6yzBdoAICMBrV+96lVAk9KBAoGAW8LrC+ei+Cejkz7w1Qf3weVc/UIU+0SF9q+2fuJbCxH7NM6FGD2qIsrl6paJx0zv1DpiQyWMcfg76ptaRTQSLR6eOWIPtY69qOzwmDCqWJIbbYtCNc4Ya0jHEkbY8tBIHLqhtcIiEadYmCIeE9QTLllXDuu8Txg1xDn5yOGPqzECgYAJkfDvr0DylctNiQMqUH0v1O9vJ1Qi0htwHJbaiGAEkB8YPZn0VTi6K455yRmthGwe2JyeX5ZXTJZCtxqMrB5RJDL5fl/Tcfj8J+ZfmUQcjy7cCV0lWi4Omvg9lWQ+z4j1S0y3vmrvphpq2b230atzvLWgznK00yZjJGB8hN6wgQKBgDLf7YR92x42JL+rwAgY8BjN9pXU7p7Antr2kpzycx8ZA7Kx+ST3BAdba+jkEwfB0R7hkmQdHNJ7xg/eV8pgMFNxocurU9yk22fq+hCBlkD/S/5EyTvh7oW0kMlYpAkY7LFScWAwjOUJFuVsXYN6g4Gb+/zJcW8tvOP6oddF9Da5"
});
//引入alipay的form模块
const Alipayform=require("alipay-sdk/lib/form").default;
//正常接受请求，准备相应内容
router.post("/paying",async(req,res)=>{
    let cost=Number(req.body.cost);//订单金额
    const randcode=req.body.randcode;//订单编号
    cost =Number(cost.toFixed(2));
    console.log(cost,randcode);
    const formData=new Alipayform();
    formData.setMethod="get";
    formData.addField("returnUrl","http://localhost:8081/home");
    formData.addField("bizContent",{
        outTradeNo:randcode,//订单编号(64个字符内)
        productCode:"FAST_INSTANT_TRADE_PAY",//产品编码(沙箱应用）
        totalAmount:cost,//订单金额
        subject:"洗护物品",//清洗物件名
        body:"订单描述"//订单描述
    })
    const result=await alipay.exec("alipay.trade.page.pay",{},{formData:formData});
    res.send(result);
})

/*--------导出路由--------*/
module.exports=router;