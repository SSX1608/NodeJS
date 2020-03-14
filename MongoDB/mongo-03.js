// 插入数据
// 与 MySQL 不同的是 MongoDB 会自动创建数据库和集合，所以使用前我们不需要手动去创建。
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // 使用db方法获取或创建数据库
    var dbo = db.db("runoob");
    var myobj = { name: "菜鸟教程", url: "www.runoob" };
    // 使用collection方法获取或创建数据表
    // insertOne方法插入一条数据
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        console.log(res);
        db.close();
    });
});