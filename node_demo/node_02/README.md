Node.js基础知识梳理
一、nodeJs概述
  1、nodejs解决了高并发的问题，支持大量用户的并发连接；它不是为新连接的用户新开一个线程，而是为新连接用户触发一个事件
  2、js引擎内置了JIT（即时编译），提高了js的执行速度，几乎接近于本地运行速度
  3、nodejs采用非阻塞型I/O及时间循环机制；即它的I/O操作是不会阻塞线程的，并且通过事件的回电函数形成触发时间环
  4、nodejs适合用于，大量处理输入/输出的应用，即如聊天器、电商网站等
  5、nodejs中是通过以模块为单位来划分所有功能的，模块的导出和引入
     //foo.js
     exports.printFoo = function(){ return "foo" }
     //bar.js
     var foo = require('./foo.js');
     console.log(foo.printFoo);
    核心模块有：
        assert、buffer、child_process、cluster、console、crypto、debugger、dns、domian、events、fs、http、https、net、os、path、punycode、querystring、readline、repl、stream、string_decoder、tls、tty、url、util、vm、zlib
二、基础知识
  1、控制台
    1.1、console.log/console.info日志打印
         node app.js 1>info.log 指定日志打印输出到文件info.log
    1.2、console.error/console.warn标准错误输出流的输出
         console.dir用于查看一个对象中的内容并将其信息输出
         console.time与console.timeEnd统计中间时间差，两个方法使用的参数字符串必须相同，中间写上运行测试程序
         console.trace将当前位置处的栈信息作为一个标准错误信息进行输出
         console.assert对一个表达式的运行结果进行评估，判断true/false
  2、全局作用域及全局函数
    2.1、nodejs中定义了一个global对象，代表全局命名空间
    2.2、全局函数有：setTimeout/clearTimeout、setInterval/clearInterval，此外定时器对象还有unref方法与ref方法，用于取消回调函数的执行和恢复回调函数的执行。
    2.3、与模块相关的全局函数和对象：require和exports，其中require参数可以是模块名也可以是完整路径的模块名称；
    2.4、__filename变量和__dirname变量
        当前模块完整的绝对路径的文件名，绝对目录
    2.5、事件机制
       node中的事件就是用户请求生命周期中的钩子，比如接收到客户端的请求、产生连接错误、请求完成等。
       node中有个event模块，定义了一个EventEmitter类，事件对象都继承于此类。事件对象的方法有addListener、on、once、removeListener、emit等
       事件环机制就是为每一个I/O操作注册一个回调函数
三、模块、包管理
    1、nodejs能下载的几种模块文件类型：.js  .json  .node文件
    2、在进行导出模块时，可以将exports写成module.exports,但是在导出类模块时，必须使用module.exports
    3、组织和管理模块
       3.1、require引入模块时，如果只写模块名称不指定路径，那么nodejs会默认去node_modules文件夹下去找，一层一层的向外查找
       3.2、可以是用目录来管理模块，在根目录建node_modules/foo/index.js，可以直接require("foo")，默认找index.js;另外还可以在foo目录下创建一个package.json文件进行入口文件的配置
        {
          "name":"foo",
          "main":"./lib/foo.js"
        }
    4、包管理工具
       nodejs中通过使用包来对一组具有相互依赖关系的模块进行统一管理；一个包其实就是一个目录，包含对包进行描述的JSON格式的package.json文件
四、Buffer类处理二进制
    在处理TCP流或文件流时，必须要处理二进制数据。在nodejs中定义了一个Buffer类，用来创建一个专门用来存放二进制数据的缓存区域。
    1、创建Buffer对象
       new Buffer(size)指定大小，然后再使用fill来初始化缓存区中的内容
       new Buffer(array)指定内容
       new Buffer(str,[encoding])指定字符串及编码格式
    2、缓存区的长度，Buffer与字符串转换，与数值、JSON的转换，已经Buffer对象的一些方法
五、操作文件系统
    1、在文件的操作方法分为同步和异步，带Sync后缀的为同步方法，不带的为异步方法（将操作结果返回给回调函数），而同步的方法是没有回调函数，但是它有返回值就是操作后的对象，大多数情况下使用异步方法。
    2、文件操作方法：
        读文件readFile/readFileSync
        写文件writeFile/writeFileSync
        模块fs.appendFile/fs.appendFileSync将数据追加到文件底部
        打开文件fs.open/fs.openSync，返回一个文件描述符（文件句柄），即第二个参数
        关闭文件fs.close/fs.closeSync
        结合fs.open和readFile/writeFile就可以从文件的指定位置开始读写文件，同时在读写操作完成后也有关闭文件
        注意：在使用write写文件操作时，操作系统做法是先将部分内容读取到内存中，然后再从内存中读取数据写入到文件中，所以当数据读取完并不一定代表写入完成，如果立即调用close方法，则会造成文件写入不完整，这是就需要使用fs模块的fsync方法对文件进行同步操作，然后再close。
    3、创建和读取目录
       fs.mkdir/fs.mkdirSync创建目录
       fs.readdir/fs.readdirSync读取目录
    4、查看文件或目录的信息
       fs.stat/fs.lstat用于查看一个文件或目录的信息
       并且在open文件之后也可以使用fs.fstat来查询被打开的文件信息
       fs.exits/fs.existsSync检查目录或文件是否存在
       fs.realpath获取文件或目录的绝对路径
       fs.utimes修改文件的访问事件和编辑时间
       fs.chmod修改文件或目录的读写权限
       fs.rename重命名或移动文件（当新旧路径形同则重命名；不同则移动，原文件删除）
       fs.link/fs.unlink为文件创建/删除硬链接
       fs.rmdir删除空目录
       fs.watchFile/fs.unwatchFile监视或取消监视文件或目录
    5、文件流
      流是一组有序的、有起点和终点的字节数据的传输手段。在个对象之间传输数据的时候都是先转换成流，进行传输，到的目标对象之后再转换成可以使用的数据。
      5.1、使用ReadStream对象读取文件
         fs模块，使用createReadStream方法创建一个将文件内容读取为流数据的ReadStream对象
         fs.createReadStream(path,[options])
         读取文件demo：
         var fs = require('fs');
         //返回一个ReadStream对象file
         var file = fs.createReadStream('./message.txt',{start:3,end:12});
         file.on('open',function(fd){
           console.log('开始读取文件');
         })
         file.on('data',function(data){
           console.log('读到数据');
         })
         //文件读取暂停
         file.pause();
         setTimeout(function(){
           //继续读取文件
           file.resume();
         },1000)
         file.on('end',function(){
           console.log('文件已全部读取完毕');
         })
         file.on('close',function(data){
           console.log('文件被关闭');
         })
         file.on('error',function(data){
           console.log('文件读取失败');
         })

      5.2、使用WriteStream对象写入文件
         fs模块中，使用createWriteStream方法创建一个将流数据写入文件中的WriteStream对象,WriteStream对象有一个write方法，用于将流数据写入到目标对象中
         var fsWrite = fs.createWriteStream(path,[options])
         fsWrite.write(chunk,[encoding],[callback])

    6、对路径进行操作 
      path模块来操作路径，方法有：    
        path.normalize(p)将非标准路径转换为标注路径
        path.join([path1],[path2],[...])将多个路径合并为一个路径字符串
        path.resolve(path1,[path2],[...])以应用程序根目录为起点，根据所有的参数值字符串解析出一个绝对路径
        path.relative(from,to)用于获取两个路径之间的相对关系
        path.dirname(p)用于获取一个路径中的目录名
六、基于TCP与UDP的数据通信
    nodejs中提供了一个net模块和一个dgram模块，分别用于实现TCP以及UDP的数据通信。
    1、net模块实现基于TCP数据通信
       1.1、创建TCP服务器
          var server = net.createServer([option],[connectionListener]);
          //option是配置项，connectionListener客户端与服务端建立连接的回调函数
          //同样也可以使用on来手动监听server.on('connection',function(socket){})
          a、在创建服务器之后，可以是用listen方法通知服务器开始监听客户端的连接，方法如下：
            方法一、server.listen(port,[host],[backlog],[callback])
            方法二、server.listen(path,[callback])
            方法三、server.listen(handle,[callback])
          b、创建的服务器有个方法address，可以获取服务器监听的地址信息，他返回一个对象，包括port，address等字段。
          c、还可以通过getConnections(callback),获取服务器连接的客户端数量。
          d、通过close方法，拒绝接受新的客户端的连接，已连接的会保持。
       1.2、socket端口对象
          net.socket代表一个端口对象，在createServer方法的connectionListener参数的所指定的回调函数中的参数值就是一个socket对象，自动创建的，代表服务器所监听的端口对象。
          a、socket.address()获取端口对象的地址信息
          b、socket端口对象可用来读取客户端发送的流数据，每次发送数据都会触发data事件
             socket.setEncoding('utf-8');//将流数据转换为字符串
             socket.on("data",function(data){
               //接收的data为流数据
               data.toString()//将流数据转换字符串
             })
             //客户端被端口连接会触发end事件
             socket.on("end",function(){})
          c、socket.pipe(destination,[options])将客户端发送的流数据书写到文件等其他目标对象中
             参数destination必须为一个可用于写入流数据的对象
             var net = require('net');
             var file = require('fs').createWriteStream('./message.txt');
             var server = net.createServer();
             server.on('connection',function(socket){
               socket.pipe(file,{end:false});
               socket.on('end',function(){
                 file.end('结束');
               })
             })
             server.listen(8431,'localhost');

             也可以是用unpipe取消目标对象的写入操作
             并且可以利用socket.pause和socket.resume进行暂停继续的操作，进行控制写入速度
       1.3、创建TCP客户端
          客户端只需要创建一个socket端口对象即可
          var net = new net.Socket([option])
          连接服务器方法：
            方法一、socket.connect(port,[host],[connectListener])
            方法二、socket.connect(path,[connectListener])
    2、使用dgram模块实现基于UDP的数据通信
       TCP是一种基于连接的协议，在通信之前必须先建立连接，而UDP是一种面向非连接的协议，不需要提前建立连接，可以直接发送数据给对方。
       1.1、创建UDP服务端与客户端
          var socket = dgram.createSocket(type,[callback]); 
          //bind绑定监听的端口地址
          socket.bind(port,[address],[callback]);
          //send方法向外发送数据
          socket.send(buf,offset,length,port,address,[callback])
       1.2、实现广播与组播
          socket.setBroadcast(flag)  
七、创建HTTP与HTTPS服务器及客户端
    1、HTTP服务器
      1.1、创建HTTP服务器
          var http = require("http");
          var server = http.createServer(function(req,res){
            //当接收到客户端请求时的回调函数
            //.....做一些处理
            res.end();//结束连接
          }).listen(1337,"127.0.0.1",function(){
            console.log("服务器开始监听");
          });
          sever.on('connection',function(){
            console.log('连接已建立');
          });
          server.close(); //服务器关闭
          server.on('close',function(){
            console.log('服务器已关闭');
          })
      1.2、获取客户端信息
          回调函数中的req对象，可以获取客户端的请求信息
          method请求方法，url请求地址，headers请求头，httpVersion版本信息等
          并且，当从客户端读取到数据时触发data事件，读取完时触发end事件
          res.on('data',function(){
            //服务器收到数据
          })
          res.on('end',function(){
            //客户端请求数据已经接受完毕
          })
      1.3、发送服务端响应流
          var http = require('http');
          var server = http.createServer(function(req,res){
            if(res.url !== '/favicon.ico'){
              //也可以使用res.setHead设置响应头，可设置多个
              res.writeHead(200,{
                'Content-Type':'text/plain',
                'Access-Control-Allow-Origin':'*'
              });
              res.write('发送的数据data');
            }
            res.end('响应结束');
          })
          头信息有：
            content-type用于指定内容类型
            location用于将客户端重定向到另一个url地址
            content-disposition用于指定一个被下载的文件名
            content-length指定响应的字节数
            set-cookie用于在客户端创建一个cookie
            content-encoding用于指定服务端响应内容的编码方式
            Cache-Control用于开启缓存机制
            Expires用指定缓存过期时间
            Etag用于指定当服务器响应内容没有发送变化时不重新下载数据
    2、HTTP客户端
      2.1、向其他网站请求数据
          var http = require('http');
          var options = {
            hostname: 'www.microsoft.com',
            port: 80,
            path: '/',
            method: 'GET'
          };
          var req = http.request(options,function(res)=>{
            console.log('状态码：'+res.statusCode);
            console.log('响应头：'+JSON.stringify(res.headers));
            res.setEncoding('utf-8');
            res.on('data',function(chunk){
              console.log('响应数据:'+chunk)
            });
          })
          req.setTimeout(1000,function(){
            req.abort();//超时取消请求
          })
          req.on('error',function(error){
            console.log('发生错误,错误代码：'+error.code)
          })
          req.write("数据");//发送数据
          req.end("结束数据发送");
      2.2、制作代理服务器
          var http = require('http');
          var url = require('url');
          var server = http.createServer(function(sreq,sres){
            var url_parts = url.parse(sreq.url);
            var options = {
              host:'www.amazon.cn',
              port:80,
              path:url_parts.pathname,
              headers:srq.headers
            };
            var creq = http.get(options,function(cres){
              sres.writeHead(cres.statusCode,cres.headers);
              cres.pipe(creq);
            })
          })
          server.listen(1337,'127.0.0.1');
八、进程与子进程
  1、nodejs中的进程
    1.1、nodejs应用中有一个全局对象process，描述进行信息的对象，有以下属性：
        execPath可执行文件的绝对路径
        version版本号
        versions各依赖版本
        platform平台信息
        stdin读入标准输入流的对象
        stdout写入标准输出流的对象
        env属性值为一个对象，包括了运行nodejs应用程序的操作系统的环境信息，包括一些定义的全局变量
    1.2、进程对象process的方法
        memoryUsage应用程序的进程的内存使用量
        nextTick用于将一个函数推迟到代码中所书写的下一个同步方法执行完毕时或异步方法的事件回调函数开始执行时调用
        abort使进程异常终止
        chdir修改当前工作目录
        cwd返回当前目录
        exit退出程序运行
        kill向进程发起一个信号
  2、创建多进程应用程序
     在nodejs中只使用一个线程来执行多有的操作，但是在node中提供了一个child_process模块，通过该模块的是哦用，在node应用程序的主进程运行之后，可以开启多个子进程。在多个子进程之间可以共享内存空间，可以通过子进程之间相互通信来实现信息的交换，多个子进程之间也可以通过共享端口的方式将请求分配给多个子进程来执行。
     2.1、使用spawn方法开启子进程
        开启一个用于运行某个命令的子进程
        child_process.spawn(command,[args],[options])
     2.2、使用fork方法开启子进程
        开启一个专用于运行node.js中的某个模块文件的子进程
        child_process.fork(modulePath,[args],[options])
     2.3、使用exec方法开启子进程
        开启一个用于运行某个命令的子进程并缓存子进程中的输出结果
        child_process.exec(command,[options],[callback])
     2.4、使用execFile方法开启子进程
        开启一个专用于运行某个可执行文件的子进程
        child_process.execFile(file,[args],[options],[callback])

          
