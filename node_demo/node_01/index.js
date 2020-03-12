const http = require('http');
// 解析url
const url = require('url');
let querystring = require('querystring');

http.createServer((req,res)=>{
  // parse方法第二个参数，解析出query
  //1、 用于get请求解析url
  // let {pathname,query} = url.parse(req.url,true)
  // console.log(pathname,query)

  //2、用于post请求，获取body里面的data
  let result=[];
  req.on('data',(buffer)=>{
    // 连续分段提交的，所以接收也有连续分段接收
    result.push(buffer);
  })
  req.on('end',()=>{
    // 最终在end里面接收到的是完整的数据
    let data = Buffer.concat(result).toString();
    console.log(querystring.parse(data));
  })

  res.writeHead(200,{
    'Content-Type': 'application/json'
  })
  res.end(JSON.stringify({
    code:0,
    msg:'登陆成功'
  }))
}).listen(8080,function(){
  console.log('server is at port:8080...')
});

const os=require('os');
console.log(os.totalmem()/1024/1024/1024)