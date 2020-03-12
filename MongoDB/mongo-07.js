// 如果要更新所有符合条的文档数据可以使用 updateMany()：
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = {"type":'en'};  // 查询条件
    var updateStr = {$set: { "url" : "https://www.runoob.com" }};
    dbo.collection("site").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        // result.nModified 为更新的条数。
        console.log(res.result.nModified + " 条文档被更新");
        db.close();
    });
});