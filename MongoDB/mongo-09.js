// 如果要删除多条语句可以使用 deleteMany() 方法
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = { name: "菜鸟教程" };  // 查询条件
    dbo.collection("site").deleteMany(whereStr, function(err, obj) {
        if (err) throw err;
        // obj.result.n 删除的条数。
        console.log(obj.result.n + " 条文档被删除");
        db.close();
    });
});