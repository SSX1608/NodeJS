var util=require('util');
function Base(){
	this.name='base';
	this.base=2012;
	this.sayHello=function(){
		console.log('hello'+this.name+'this year is'+this.base);
	};
}
Base.prototype.showName=function(){
	console.log(this.name);
}
function Sub(){
	this.name='sub';
}
util.inherits(Sub,Base);

// 原有输出
var objBase=new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);

// 继承后的子类输出
var objSub=new Sub();
objSub.showName();
// objSub.sayHello();
console.log(objSub);