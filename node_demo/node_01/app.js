const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

// json数据模拟数据库
let user={
  admin:'123456'
}

http.createServer((req,res)=>{
  //获取客户端发送的数据，分请求方法进行处理
  // get方法和post方法接收到的数据不同，所以解析数据的方式也不同
  let path,get,post;
  if (req.method == 'GET') {
    let {pathname,query} = url.parse(req.url,true);
    path = pathname;
    get = query;

    complete();
  } else {
    let arr=[];
    path = req.url;
    req.on('data',buffer=>{
      arr.push(buffer);
    })
    req.on('end',()=>{
      post = querystring.parse(Buffer.concat(arr).toString());
      complete()
    })

  }

  function complete(){
    // 编写接口
    if(path=='/login'){
      // 设置请求头
      res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
      })
      let {username,password}=get
      if(!user[username]){
        res.end(JSON.stringify({
          err:1,
          msg:'用户名不存在'
        }))
      }else if(user[username]!=password){
        res.end(JSON.stringify({
          err:2,
          msg:'密码错误'
        }))
      }else{
        res.end(JSON.stringify({
          err:0,
          msg:'登陆成功'
        }))
      }
    }else if(path=='/reg'){
      // 设置请求头
      res.writeHead(200,{
        "Content-Type":"text/plain;charset=utf-8"
      })
      let {username,password} = post
      if(user[username]){
        res.end(JSON.stringify({
          err:1,
          msg:"账户已经存在"
        }))
      }else{
        user[username] = password;
        res.end(JSON.stringify({
          err:0,
          msg:"注册成功"
        }))
      }
    }else{
      // 编写页面服务
      fs.readFile(`.${path}`,(err,data)=>{
        if(err){
          res.end('404');
        }else{
          res.end(data)
        }
      })
    }
  }

}).listen(8080)