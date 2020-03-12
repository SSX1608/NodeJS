// 创建数集合，相当于数据表
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/runoob';

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    // 使用数据库的db方法创建数据库对象
    var dbase = db.db("runoob");
    // 使用db对象的createCollection创建数据集合
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});