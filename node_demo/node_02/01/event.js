// 声明事件对象
var EventEmitter=require('events').EventEmitter;
var event=new EventEmitter();
// 注册事件,自定义事件
event.on('some_event',function(){
	console.log('这是一个自定义的事件');
});
// 延时触发事件
setTimeout(function(){
	event.emit('some_event');
},3000);