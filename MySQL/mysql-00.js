var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'mysql',
  user:'root',
  password:'123456'
})

connection.connect(function(err){
  if(err){
    console.log('与MySQL连接失败');
  }else{
    console.log('与MySQL连接成功');
    // 创建数据表table
    var tablename = "`usernew`";
    // 创建数据表的sql语句，并初始化数据字段，数据类型，主键，not null，存储引擎，默认编码等
    var sql = "CREATE TABLE IF NOT EXISTS" + tablename + "(\
        `runoob_id` INT UNSIGNED AUTO_INCREMENT,\
        `runoob_title` VARCHAR(100) NOT NULL,\
        `runoob_author` VARCHAR(40) NOT NULL,\
        `submission_date` DATE,\
        PRIMARY KEY ( `runoob_id` )\
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;\
    "
    connection.query(sql,function (err, result) {
      if(err){
        console.log('新建失败 - ',err.message);
        return;
      }        
      console.log(result)
    });
  }
})