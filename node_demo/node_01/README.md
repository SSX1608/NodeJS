## nodejs的介绍，一些工具，和环境
  ### Node介绍
  #### 为什么学Node
    使自己更全面，有大局观
    提升话语权
    升职加薪的筹码

  ##### Node的作用和应用
    脱离浏览器运行JS
    后台API编写 
    Webpack，Gulp，Npm等
    中间层：服务器中负责IO读写的中间层服务器
            性能很好，异步I/O天生处理高并发，天猫双11使用中台
            处理数据，加工后台返回的数据
            安全性
  
  ##### Node的优势
    便于前端开发入门
    性能高（对于java、php）
    利于前端代码整合

  ##### NPM包管理
    原始的管理方式就是通过script标签引入
    而npm是通过package.json来管理依赖包的
    uninstall可以简写un

  #### Node中的模块
    全局模块（对象） process，不需要引用，可直接使用
        process.env (计算机的环境变量)
        process.argv (node命令后面的参数)
        __dirname 当前目录
    
    系统模块 require之后可以使用，不需要安装
        path处理文件路径和目录路径的工具
            path.dirname目录名
            path.basename文件名
            path.extname文件扩展名

            path.resolve合并路径
            path.resolve(__dirname,'index.js')获取绝对路径

        fs文件读写操作
            fs.readFile
            fs.writeFile

    自定义模块  安装 并require使用
        require自己封装的模块
        1、exports 是一个对象，将取属性暴露到模块外部
        2、module 全局模块module.exports
        3、require 
            如果有路径，就去路径里面找
            如果没路径就去node_modules里面找
            如果以上都没有，就去node的安装目录里面找node_modules

    HTTP模块
        http.createServer((req,res)=>{
          fs.readFile(`./${req.url}`,(err,data)=>{
            if(err){
              res.writeHead(404)
              res.end('404 not find')
            }else{
              res.end(data)
            }
          })
        }).listen(8080)

  #### 数据交互
      GET请求，数据放到url中，容量小于32k，一次性传输数据
        通过url模块解析参数，url.parse(req.url,true)
      POST请求，数据放到body里面，容量小于2G，分段传输数据
        通过querystring模块解析data，querystring.parse(data)

  #### 在http模块中，请求数据get和post接收数据的方式不同
      1、 url.parse用于get请求解析url，直接从url中获取客户端数据
        let {pathname,query} = url.parse(req.url,true)
        console.log(pathname,query)

      2、用于post请求，获取body里面的data
         由于post发送数据是连续分段发送的，所以接收也要连续接收，并且只有在end时间回调里面才能接收完整的数据
        let result=[];
        req.on('data',(buffer)=>{
          // 连续分段传输的，所以接收也有连续分段接收
          result.push(buffer);
        })
        req.on('end',()=>{
          // 最终在end里面接收到的是完整的数据
          let data = Buffer.concat(result).toString();
          console.log(querystring.parse(data));
        })


  #### 接口设计
    什么是接口（API）：不同功能层之间的通信规则称为接口
    设计步骤：
      接口名称：'login'
      请求方法：GET
      参数：username,password
      返回值：{
          err:0,
          msg:'密码错误'
        }
      给一个接口文档案例


  #### 在package.json中配置启动脚本，npm start直接运行，代替执行node 文件名

  ### nodejs的一些工具
    nodemon热启动工具
    配置nodemon监听的目录，项目根目录建文件nodemon.json
      {
        "watch":["./src/**/*.js"]
      }

    nrm和npm
    nrm ls设置切换npm包源的管理
    nrm use
    nrm add 添加私服
    nrm current

    nvm管理nodejs版本

    web应用
        前端
          ajax，websocket-----> 服务器（web应用的一部分）--> 缓存/数据库

    express：node中的一种web应用框架
        接收req，处理res
