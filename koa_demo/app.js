// 导入Koa，因为导入的是class所以使用大写Koa
const Koa = require('koa');
// 创建一个Koa对象标识web app应用
const app = new Koa();

// 分析：每收到一个http请求，koa就会调用通过app.use()注册的async函数，并传入ctx和next参数。我们可以对ctx操作，并设置返回内容。
// 但是为什么要调用await next()？
// 原因是koa把很多async函数组成一个处理链，每个async函数都可以做一些自己的事情，然后用await next()来调用下一个async函数。我们把每个async函数称为middleware，这些middleware可以组合起来，完成很多有用的功能。

// 如下的middleware
// middleware的顺序很重要，也就是调用app.use()的顺序决定了middleware的顺序。
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
  await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
  const start = new Date().getTime(); // 当前时间
  await next(); // 调用下一个middleware
  const ms = new Date().getTime() - start; // 耗费时间
  console.log(`Time: ${ms}ms`); // 打印耗费时间
});

app.use(async (ctx, next) => {
  await next();
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello, koa2!</h1>';
});


// 对于任何的请求，app将调用该异步函数处理请求
// 参数ctx是由koa传入的封装了request和response的变量
// next是koa传入的将要处理的下一个异步函数。
app.use(async (ctx,next)=>{
  await next();
  // 设置response的Content-Type:
  ctx.response.type = 'text/html';
  ctx.response.body = '<h1>Hello,koa2 !</h1>';
});

app.listen(3000);
console.log('app started at port 3000...');

// 此外，如果一个middleware没有调用await next()，会怎么办？答案是后续的middleware将不再执行了。这种情况也很常见，例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：
app.use(async (ctx, next) => {
  if (await checkUserPermission(ctx)) {
      await next();
  } else {
      ctx.response.status = 403;
  }
});

// 最后注意ctx对象有一些简写的方法，例如ctx.url相当于ctx.request.url，ctx.type相当于ctx.response.type。
