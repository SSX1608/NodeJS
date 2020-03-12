// 简单示例
// 引入node内置模块http
var http = require("http");
// 使用http模块的createServer方法创建一个服务器实例，接收一个客户端请求的回调函数
http.createServer((req,res)=>{
  // req客户端请求对象
  console.log(req);
  // res服务端响应对象
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write("<head><meta chart='utf-8'/></head>");
  res.end("<h1>hello NodeJs</h1>");
}).listen(3030);
console.log("Server runing at port:3030");
console.log(__dirname);
console.log(__filename);