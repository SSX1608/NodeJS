function hello(){
	var name;
	this.setName=function(thyName){
		name=thyName;
	}
	this.sayHello=function(){
		console.log('hello '+name);
	}
}
// exports.hello=hello;相同写法
module.exports=hello;