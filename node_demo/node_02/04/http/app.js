// 引入模块
var http=require('http');
// 创建http服务
var server=http.createServer(function(req,res){
	// 客户端请求时都可以触发此回调函数（已经做了监听），
	// 相当于action都在这里定义
	console.log(req.url);
	// 写出响应头
	res.writeHead(200,{'Content-Type':'text/html'});
	// 响应内容
	res.write('<h1>Node.js</h1>');
	// 结束响应
	res.end('<p>PCAT</p>');
});
// 监听端口
server.listen(3000);
// 监听连接关闭
server.on('close',function(){
	console.log('server is closed');
});

setTimeout(function(){
	// 关闭服务器连接
	server.close();
},2000);
console.log('HTTP server is listening at port 3000');