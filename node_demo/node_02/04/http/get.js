// 引入模块
var http=require('http');
var url=require('url');
var util=require('util');
// 创建服务
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain'});
	// 解析并转成字符串形式返回给客户端
	// parse里面的第二个参数为true时返回query是对象，false时是个字符串
	res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);