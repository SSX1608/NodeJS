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
function insertData(){
  for(var i=1;i<4;i++){
    var sqlStr="INSERT INTO "+tableName+"(id,name,age) values("+connection.escape(i)+","+connection.escape("守信")+","+connection.escape(30)+");";
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
function updateData(){
  connection.query("update "+tableName+" set name =? where age=?",["姓名","99999"],function(err,result){
    if(err) console.log("更新数据失败");
    else{
      deleteData();
    }
  })
}
function deleteData(){
  connection.query("delete from "+tableName+" where name=?",["lily"],(err,result)=>{
    if(err) console.log("删除数据失败");
    else{
      queryData();
    }
  })
}
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