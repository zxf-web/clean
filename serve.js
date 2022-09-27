/*--------导入第三方模块express(前后端数据交互)-------------*/
var Express=require('express');
//调用express函数，创建app应用
var app=Express();
//创建web服务(实质是监听事务)
app.listen(8080,function(){
    console.log('服务已启动');
})


/*---------------------数据库连接---------------------*/
//导入自定义数据库模块
var my=require('./router/mysql.js');
var con=my();

/*--------导入中间件-------------*/
//body-parser(处理post请求参数编码格式问题)
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));

//使用express自带的静态资源放置的中间件
app.use('/',Express.static(__dirname+"/dist"));
// app.use('/',Express.static('../cleaning/dist'));

/*--------设置跨域-------------*/
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    next();
})
// app.all("*",function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");//设置允许跨域的域名，*代表允许任意域名
//     res.header("Access-Control-Allow-Headers","content-type");//允许的header类型
//     res.header("Access-Control-Allow-Methods","POST,GET,PUT,DELETE,OPTIONS");//跨域请求方式
//     next();
// })



/*--------导入文件-------------*/
//导入user.js文件，引入用户表的路由
var users=require("./router/user.js");
//改变接口路径，将user.js文件中所有接口加一个目录路径/user/login
app.use("/user",users)

//导入cart.js文件，引入清洗列表路由
var carts=require("./router/cart.js");
app.use("/cart",carts);

//导入order.js文件，引入订单表路由
var orders=require("./router/order.js");
app.use("/order",orders);

//导入person.js文件，引入个人中心路由
var persons=require("./router/person.js");
app.use("/person",persons);

//导入thing.js文件，引入物件表路由
var things=require("./router/thing.js");
app.use("/thing",things);

//导入address.js文件，引入地址表表路由
var address=require("./router/address.js");
app.use("/address",address);

//导入admin.js文件，引入管理员表路由
var admin=require("./router/admin.js");
app.use("/admin",admin);

//导入person.js文件
var statistic=require("./router/statistic.js");
app.use("/statistic",statistic);







//导入payment.js文件，引入支付路由
var payment=require("./router/payment.js");
app.use("/payment",payment);
/*--------创建接口-------------*/

