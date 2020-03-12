// mongoDB 不是一个关系型数据库，但我们可以使用 $lookup 来实现左连接。
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    dbo.collection('orders').aggregate([
        { $lookup:
            {
                from: 'products',           //右集合
                localField: 'product_id',   //左集合 join字段
                foreignField: '_id',        //右集合 join字段
                as: 'orderdetails'          //新生成字段（类型array）
            }
        }
    ], function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
});