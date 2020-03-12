var http = require('http');
// http.createServer创建服务器实例
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/html','charset':'utf-8'});
	res.write('<h1>Node.js我们已经有服务了,修改了</h1>');
	res.end('<p>视频出处:PCAT2</p>');
}).listen(5858);//监听端口