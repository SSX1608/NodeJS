const express = require('express');
const app = express();

const models = require('./models');//模型对象

// models.User
// models.Sequlize
// models.sequlize

app.get('/create',async (req,res)=>{
  let {name} = req.query;
  // create返回一个promise对象，此处的user是一个sequlize对象
  // 向数据表中创建一条数据
  let user = await models.User.create({
    name
  });
  console.log(user);
  res.json({
    message:'创建成功',
    user
  })
})

app.get('/list',async (req,res)=>{
  let list = await models.User.findAll();
  res.json({
    list
  })
})

app.get('/detail/:id',async (req,res)=>{
  let {id} = req.params;
  let user = await models.User.findOne({
    where:{
      id
    }
  });
  res.json({
    user
  })
})

app.listen(3000,()=>{
  console.log('服务启动成功');
})