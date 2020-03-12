var http=require('http');
var server=new http.Server();
// 原生注册request事件
// 而http提供里一个封装的捷径：http.creatServer([requestListener])直接返回一个服务
server.on('request',function(req,res){
	console.log(req);
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write('<h1>we are pcat</h1>');
	res.end('<p>I am marico</p>');
});
server.listen(3000);