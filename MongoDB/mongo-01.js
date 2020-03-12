// 创建数据库：要在 MongoDB 中创建一个数据库，首先我们需要创建一个 MongoClient 对象，
// 然后配置好指定的 URL 和 端口号。如果数据库不存在，MongoDB 将创建数据库并建立连接。
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";
 
 // 使用MongoClient对象的connect方法连接数据库
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  // 数据库创建之后不会立刻显示，必须建立数据集合才会出现
  console.log("数据库已创建!");
  db.close();
});