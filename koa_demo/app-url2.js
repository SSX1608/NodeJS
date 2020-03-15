const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');

// 导入router-url2中间件
const controller = require('./router-url2');
app.use(bodyParser());
// 使用middleware:
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');