var fs=require('fs');
fs.open('content.txt','r',function(err,fd){
	if(err){
		console.log(err);
		return;
	}

	// 定义一个缓存区对象
	var buf=new Buffer(8);
	fs.read(fd,buf,0,8,null,function(err,bytesRead,buffer){
		if(err){
			console.log(err);
			return;
		}
		console.log('bytesRead '+bytesRead);
		console.log(buf.toString());
	})
})

// r：读取模式
// r+：读写模式
// w：写入模式
// w+：读写模式
// a：追加模式
// a+：读取追加模式
// fs.read(fd,buffer,offset,length,position,[callback(err,bytesRead,buffer)])
// 是POSIX中read函数的封装，相比readFile提供了更底层的接口。从指定的文件
// 描述中读取数据并写入
// fd指定的文件描述
// offset是buffer的写入偏量值
// buffer指向的缓存区对象
// length读取的字节数
// position文件读取的起始数，如果为null，则从当前文件指针读取
// 回调函数传递err,bytesRead和buffer，分别标识读取的字节和缓冲对象