
var MongoClient = require("mongodb").MongoClient;
var DB_URL = "mongodb://localhost:27017";
 
function insertData(db)
{
  var devices = db.db('demo');
  var data = {"name":"node","age":22,"addr":"nb","addTime":new Date()};
  devices.collection("person").insertOne(data,function(error, result){
    if(error)
    {
      console.log('Error:'+ error);
    }else{
 
      console.log(result.result.n);
    }
    db.close();
  });
}
  
MongoClient.connect(DB_URL, function(error, db){
  console.log('连接成功!');
  insertData(db);
});