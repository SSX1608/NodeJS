var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'mysql',
  user:'root',
  password:'123456'
});

// 通过Connection对象的query方法统一进行数据的增加、删除、查询及修改等处理，通过sql语句进行相应的操作
// 参数1是sql语句，参数2是用于sql语句中使用的变量的值，参数3是回调函数
connection.connect(function(err){
  if(err){
    console.log('与MySQL连接失败');
  }else{
    console.log('与MySQL连接成功');
    // 插入数据库之前要先建表，确定键名，主键（主键必须不能为null，并且是int类型）
    connection.query('INSERT INTO users SET ?',{
      id:6,
      name:'守信',
      age:20
    },function(err,result){
      if(err){
        console.log('插入数据失败');
        console.log(err);
      }else{
        // 通过result的insertId属性获取插入数据的主键值
        console.log('插入数据的ID值为%d',result.insertId);
        // 查询数据表
        connection.query('SELECT * FROM ??',['users'],function(err,result){
          if(err){
            console.log('查询数据失败');
          }else{
            console.log(result);
            connection.end();
          }
        })
      }
    })
  }
})


