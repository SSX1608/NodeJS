// 可以使用 find() 来查找数据, find() 可以返回匹配条件的所有数据。 
// 如果未指定条件，find() 返回集合中的所有数据。
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    // 返回集合中所有数据
    dbo.collection("site"). find({}).toArray(function(err, result) { 
        if (err) throw err;
        console.log(result);
        db.close();
    });
    
    // 匹配条件查询
    // var whereStr = {"name":'菜鸟教程'};  // 查询条件
    // dbo.collection("site").find(whereStr).toArray(function(err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     db.close();
    // });
    
});