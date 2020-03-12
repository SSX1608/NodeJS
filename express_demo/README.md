
# Express介绍
## web服务 如何处理一个请求

url-->网络-->dns解析-->目标服务器
  1.如何响应这个请求-->由后台处理路由/规则，怎么走
    a、请求的方法区分:get/post
      // 1、通过请求的方法类型,区分不同路由 get/post/put/delete
      app.get('/demo',(req,res)=>{
        res.json({
          messge:'express get'
        })
      })
      app.post('/demo',(req,res)=>{
        res.json({
          messge:'express post'
        })
      })

    b、通过uri-->路径: www.baidu.com/ac/b/a.html
      // 2、通过uri
      app.get('/user/byname',(req,res)=>{
        let {name} = req.query;
        res.json({
          name
        })
      })

      app.get('/user/byid',(req,res)=>{
        let {id} = req.query;
        res.json({
          id
        })
      })

## 1.需要定义一个 api/路由 满足客户端无论使用什么请求方式（get/post/delete/put）都可以得到响应
    1、app.all满足所有请求方法
        // 使用app.all满足所有请求方法
        app.all('/demoAll',(req,res)=>{
          res.json({
            message:'demo',
            method:req.method
          })
        })

        // 使用app.use实现路由请求，满足所有请求方法
        app.use('/useDemo',(req,res)=>{
          res.json({
            message:'from use',
            method:req.method
          })
        })
    2、app.all('/*',(req,res)=>{})无论任何的uri都响应
        // app.all满足所有的uri
        app.all('/*',(req,res)=>{
          res.json({
            message:'demo',
            method:req.method,
            uri:req.path
          })
        })

        // 使用app.use满足所有uri
        app.use((req,res)=>{
          res.json({
            message:'from use',
            method:req.method,
            uri:req.path
          })
        })
    3、app.use -->使用中间件
        路由是一种中间件，所以可以处理路由，如上
    
    4、获取路由参数
      // 处理接口
      app.get('/name/:age',(req,res)=>{
        // 获取参数
        let {age} = req.params;
        res.json({
          name:'tom',
          age
        })
      })

## 2.如何做路由拆分 express.Router
    将app.js入口文件中的路由定义，拆分成几个路由文件：
      member.router.js、sku.router.js、order.router.js
      在拆分文件中express有一个Router方法，可以生成一个router对象，它是express的派生对象
      const express = require('express');
      // router是app的子对象
      const router = express.Router();
      可以是用router做所有入口文件中app能做的路由定义
      路由定义，中间件使用......
      module.exports = router; //最后记得把当前路由对象导出

      那么在入口文件app.js中需要将拆分的路由引入，并进行注册
      // 注册路由,在给每一个路由模块添加一个命名空间,来区分相同的子路由
      app.use('/member',memberRouter);// member/list
      app.use('/sku',skuRouter);// sku/list
      use方法第一个参数是添加的父路由，类似于拆分路由的命名空间，以免造成路由冲突


## 3.中间件
   中间件完整的结构：
      1、是一个函数
      2、参数：err,req,res,next-->function
      function demo_middleware(err,req,res,next){
        //内部操作
         1.异常处理
         2.处理下业务功能，然后再转交控制器 -->next()
         3.响应请求--结束响应 ---> 当做路由的处理函数
      }            

    中间件的使用级别
      1、app 级别的使用
        1）在最顶级注册，app初始化后
        2）使用app.use的api加载进来
      2、router 级别的使用
      3、异常处理 --> app级别、或router级别，根据应用场景
    
    中间件分为：
        内置中间件，自定义中间件，第三方中间件

    中间件的使用方式：
        全局使用，即通过use来加载
        路由使用，即通过定义路由里面来使用
            // 中间件在路由规则内部使用,第二个参数为中间件组成的数组
            router.get('/list',[/** middleware **/],(req,res)=>{})

## 4.异常处理
   直接抛出异常是不友好的，比如
     throw new Error("抛出异常")
    然而可以是用中间件处理异常，将异常封装成一个可视化的对象，便于前端阅读并使用
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

    处理404的中间件
    只需要再所有的路由之后增加一个use中间件，所有的路由匹配不到的时候匹配，相当于默认路由匹配
    app.get('/',function(req,res){
        //.....
    }).get('/list',function(req,res){
        //.....
    }).use(function (req, res,next) {
      // 所有未处理的请求路径都会跑到这里404,兜底的
      res.json({
        message:'api不存在'
      })
    })

## 5.mysql
    使用数据库可视化工具，navicat
    mysql --> 结构化数据库的一种
    mysql --> 服务，提供了数据存放的服务
    --> 数据库：划分的数据存储区域
      --> table:
       --> js对象组成的数组




