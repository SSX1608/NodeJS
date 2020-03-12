function compute(){
	console.log('I am is compute method');
}
function somethingComplited(args){
	console.log("I am is somethingComplited method");
	console.log(args);
}
// function doSomething(args,callback){
// 	somethingComplited(args);
// 	callback();
// }
// 大的方法分割成小的方法
function doSomething(args,callback){
	somethingComplited(args);
	process.nextTick(callback);
}
doSomething('123456',function onEnd(){
	compute();
})