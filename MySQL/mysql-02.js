var mysql = require('mysql');
// 创建Connection连接对象
var connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'mysql',
  user:'root',
  password:'123456'
});
function handleDisconnect(){
  connection.connect(function(err){
    if(err){
      console.log('与MySQL连接失败');
      console.log(err);
    }else{
      console.log('与MySQL连接成功');
    }
  })
}
// 连接对象监听网络连接失败的error事件，当与数据库服务器之间的连接丢失事，错误对象的code属性为PROTOCOL_CONNECTION_LOST
connection.on('error',function(err){
  if(err.code==='PROTOCOL_CONNECTION_LOST'){
    console.log('与MySQL数据库之间的连接丢失');
    setTimeout(() => {
      handleDisconnect();
    }, 10000);
  }else{
    throw err;
  }
})
handleDisconnect();

