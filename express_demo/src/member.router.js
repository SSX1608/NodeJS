const express = require('express');

// router是app的子对象
const router = express.Router();

// 路由级别中间件
router.use(function(req,res,next){
  console.log('log from router');
  next();
})


function vlaid_login_params(req,res,next){
  let {name,password} = req.query;
  if(!name || !password){
    res.json({
      message:'参数校验失败'
    })
  }else{
    // 中间件也可以加工响应数据
    req.formdata = {
      name,
      password
    }
    next();
  }
}
// 中间件在路由规则内部使用,第二个参数为中间件组成的数组
router.get('/list',[vlaid_login_params/** middleware **/],(req,res)=>{
  let {formdata} = req;
  res.json({
    formdata,
    list:[
      {
        id:001,
        name:'四季'
      }
    ]
  })
})

module.exports = router;