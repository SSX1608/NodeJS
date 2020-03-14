var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'mysql',
  user:'root',
  password:'123456'
});
var out = fs.createWriteStream('./message.txt');
out.on('error',function(err){
  console.log('写文件失败：'+err.message);
  // 退出进程
  process.next();
});
connection.connect(err=>{
  if(err){
    console.log('数据库连接失败');
  }else{
    console.log('数据库连接成功');
    var query=connection.query('select * from users');
    query
    .on('error',err=>{
      console.log('读取数据失败：'+err.message);
      process.exit();
    })
    // 监听读取字段fields的事件
    .on('fields',fields=>{
      var str="";
      fields.forEach(field=>{
        str+=field.name;
        str+=String.fromCharCode(9);
      });
      out.write(str+'\r\n');
    })
    .on('result',row=>{
      // 接收暂停
      connection.pause();
      out.write(row.id + String.fromCharCode(9)+row.name+String.fromCharCode(9)+row.age+'\r\n',err=>{
        // 恢复接收，为了控制接收速度，减轻服务压力
        connection.resume();
      })
    })
    .on('end',()=>{
      console.log('数据已全部写完');
      // 终止连接
      connection.end();
    })
  }
})
