var fs=require('fs');
// 异步读取文件
// fs.readFile('file.txt','UTF-8',function(err,data){
// 	if(err){
// 		console.log('read file err');
// 	}else{
// 		console.log(data);
// 	}
// })

// 同步读取文件
var data=fs.readFileSync('file.txt','utf-8');
console.log(data);
console.log('end');