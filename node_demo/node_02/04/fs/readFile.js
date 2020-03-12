// 引入模块
var fs=require('fs');
// 调用读取文件的方法，不指定编码默认是二进制流
fs.readFile('content.txt',function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});
fs.readFile('content.txt','UTF-8',function(err,data){
	if(err){
		console.log(err);
	}else{
		console.log(data);
	}
});

try{
	var data=fs.readFileSync('content.txt','UTF-8');
	console.log(data+'同步读取');
}catch(e){
	console.log(e);
}