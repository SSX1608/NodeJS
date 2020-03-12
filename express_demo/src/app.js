// 引入express
const express = require('express');
// 初始化express应用实例
const app = express();

// 全局中间件.通过use注册
function log_middleware(req,res,next){
  console.log('请求....');
  next();
}
app.use(log_middleware);

// 加载一个 static 的内置中间价（静态资源）
// 第一个参数是相对于package.json的路径，第二个参数相关配置如扩展名等
app.use(express.static('static',{
  extensions:['css','less']
}))

// 第三方中间件，首先需要install，再require
const cookieParser = require('cookie-parser');
app.use(cookieParser())


const memberRouter = require('./member.router');
const skuRouter = require('./sku.router');
// 注册路由,在给每一个路由模块添加一个命名空间,来区分相同的子路由
app.use('/member',memberRouter);// member/list
app.use('/sku',skuRouter);// sku/list


// 中间件结构，它是一个函数，参数有四个：err,req,res,next--function
function demo_middleware(err,req,res,next){
  //内部操作
  // 1.异常处理
  // 2.处理下业务功能，然后再转交控制器 -->next()
  // 3.响应请求--结束响应 ---> 当做路由的处理函数
}   

//  /test?name=123
function valid_name_middleware(req,res,next){
  let {name} = req.query;
  if(!name || name.length){
    res.json({
      message:'缺少参数name'
    })
  }else{
    next(); //交出控制权
  }
}

// 1走到这里，相当在接口路由处理的时候的拦截器的功能
app.all('*',valid_name_middleware);

// 2走到这里
app.get('/test',(req,res)=>{
  res.json({
    message:'test'
  })
})

// 异常处理中间件
function error_handler_middleware(err,req,res,next){
  if(err){
    let {message} = err;
    res.status(500)
    .json({
      message:`${message || '服务器异常'}`
    })
  }else{
    next();
  }
}

// 加载异常处理中间件时放到所有路由定义的最低端
app.use(error_handler_middleware);

// 404，另外express不会处理404的错误，所以用中间件处理404，并放到所有路由的最低端
// 只需要再所有的路由之后增加一个，所有的路由匹配不到的时候匹配，相当于默认路由匹配
app.use(function (req, res,next) {
// 所有未处理的请求路径都会跑到这里
  res.json({
    message:'api不存在'
  })
})

app.listen(3000,()=>{
  console.log("服务启动成功");
})