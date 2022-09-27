//封装数据库连接对象
function Mysql(){
    //1.导入数据库模块
    const mysql=require('mysql');
    //2.创建连接对象
    const connection=mysql.createConnection({
        host:'localhost',//主机名
        port:'3306',//端口号
        user:'root',//数据库用户名
        password:'',//数据库密码
        database:'clean_platform'//数据库名
    })
    //3.连接数据库
    connection.connect();
    return connection;
}
//4.导出数据库连接对象
module.exports=Mysql;