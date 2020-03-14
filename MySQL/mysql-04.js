var mysql = require('mysql');
var tableName = "users";
var connection = mysql.createConnection({
  host:'localhost',
  port:3306,
  database:'mysql',
  // 同时执行多条语句
  multipleStatements:true,
  user:'root',
  password:'123456'
});
connection.connect(err=>{
  if(err) console.log('与MySQL数据库建立连接失败');
  else{
    console.log('与MySQL数据库建立连接成功');
    insertData();
  }
});
// 插入数据的sql语句，有两种方式：
// 1）'INSERT INTO tableName(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
//     query的第二个参数不提供，有语句中的VALUES()里面的值提供，如果VALUES()里面有？则需要用query的第二个参数提供
// 2）'INSERT INTO tableName SET ?'
//     这种方式sql语句值给了表名字，那么就需要query的第二个参数了，并且第二个参数为一个对象，属性值与表中的key一致
function insertData(){
  for(var i=1;i<4;i++){
    var sqlStr="INSERT INTO "+tableName+"(id,name,age) VALUES("+connection.escape(i)+","+connection.escape("守信")+","+connection.escape(30)+");";
    connection.query(sqlStr,(err,result)=>{
      if(err){
        console.log("插入数据失败");
        console.log(err);
      }else{
        updateData();
      }
    })
  }
}
// 更新的sql语句
// 'UPDATE tableName SET name = ?,url = ? WHERE id = ?'
// query的第二个参数数组，按照前面sql语句参数的顺序进行提供，WHERE前是更新的字段，WHERE后是更新的条件
function updateData(){
  connection.query("update "+tableName+" set name =? where age=?",["姓名","18"],function(err,result){
    if(err) console.log("更新数据失败");
    else{
      deleteData();
    }
  })
}
// 删除的sql语句
// 'DELETE FROM tableName WHERE id=?
// query的第二个参数需要提供删除的条件参数
function deleteData(){
  connection.query("delete from "+tableName+" where name=?",["lily"],(err,result)=>{
    if(err) console.log("删除数据失败");
    else{
      queryData();
    }
  })
}
// 查找的sql语句
// 查看全部 'SELECT * FROM tableName'
// 根据条件查找 'SELECT * FROM websites WHERE name=?'
// 根据条件则query的第二个参数为数组，元素为查询的条件
function queryData(){
  connection.query("SELECT * FROM "+tableName,function(err,result){
    if(err) console.log("查询数据失败");
    else{
      console.log(result);
      // end之后再进行上面的操作循环就会报错，Cannot enqueue Quit after invoking quit
      // 需要每次操作之前都有重新连接一下
      // connection.end();
    }
  })
}