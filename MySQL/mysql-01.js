var mysql = require('mysql');
// 创建Connection连接对象
var connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'mysql',
  user:'root',
  password:'123456'
})

// Connection的connect方法与数据库建立连接
connection.connect(function(err){
  if(err){
    console.log('与MySQL连接失败');
  }else{
    console.log('与MySQL连接成功');
    // Connection的end方法结束连接
    connection.end(function(err){
      if(err) console.log('关闭mysql数据库失败')
      else{
        console.log('关闭mysql数据库成功');
      }
    })
    // 也可以使用destroy方法结束连接，并销毁端口对象，不使用任何参数
    // connection.destroy();
  }
})