const express = require('express');
const router = express.Router();

router.get('/list',(req,res)=>{
  res.json({
    list:[
      {
        id:001,
        price:200,
        name:'外套'
      }
    ]
  })
})

module.exports = router;