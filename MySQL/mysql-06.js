// 为多个数据库连接创建并维护一个连接池，当连接不再需要使用时，这些连接可以缓存在连接池中，当接收到下一个客户端请求时，可以从连接池中取出并重新利用，而不需要再重新建立数据库连接，节省性能。
var mysql = require('mysql');
// 建立连接池对象，作为连接的缓存
var pool = mysql.createPool({
  host:'localhost',
  port:3306,
  database:'mysql',
  user:'root',
  password:'123456'
});
// 通过连接池对象的getConnection方法隐式创建并返回一个数据库连接
pool.getConnection((err,connection)=>{
  if(err){
    console.log('数据库连接失败');
  }else{
    console.log('数据连接成功');
    connection.query('select * from users',(err,rows)=>{
      if(err){
        console.log('查询数据失败');
      }else{
        console.log(rows);
        pool.end();
      }
    })
  }
})