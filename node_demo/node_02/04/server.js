var express = require('express');
var http = require('http');
var app = express();
// 使用get方法接收客户端提供的GET请求并返回响应，第一个参数为请求的地址url
app.get('/index.html',function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<head><meta charset="utf-8"/></head>');
    res.end('你好\n');
});
// 使用listen方法隐式创建一个http服务器
app.listen(1337, "127.0.0.1");
