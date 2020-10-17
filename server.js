const express = require('express')
const path = require('path')
//建立数据库链接
require('./mongoDB/db')
//引入集合
const userModle = require('./mongoDB/cellctions/user')
// 首页
const catmovie = require('./datas/Home/catmovie.json')
const guesthouse = require('./datas/Home/guesthouse.json')
const citys = require('./datas/common/city.json')
//常子瑞
const like = require('./datas/zirui/like.json')
const merchant = require('./datas/zirui/merchant.json')
const order = require('./datas/zirui/order.json')
const persnal = require('./datas/zirui/persnal.json')
const buying = require('./datas/zirui/buying.json')
//王玉茹
const getPoiList = require('./datas/yuru/getPoiList.json')
//祁建帅
const pinglun = require('./datas/qijianshuai/pinglun.json')
const shopLike = require('./datas/qijianshuai/shopLike.json')
const fooddetail = require('./datas/qijianshuai/shopdetail.json')
const app = new express()
//暴露静态资源文件
app.use(express.static(path.resolve(__dirname,'public')))
// app.use((req, res, next) => {
//   res.set({
//     'Access-Control-Allow-Credentials': true, //允许后端发送cookie
//     'Access-Control-Allow-Origin':  '*', //任意域名都可以访问,或者基于我请求头里面的域
//     'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type', //设置请求头格式和类型
//     'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',//允许支持的请求方式
//     'Content-Type': 'application/json; charset=utf-8'//默认与允许的文本格式json和编码格式
//   })
//   next();
// })
app.use(express.json())
//登录请求
app.post('/login',(req,res)=>{
    //数据库存在的数据{username:'cat',password:123}
    let {username,password} = req.body;
    (async (username)=>{
      try{
        let userInfo = await userModle.findOne({username})
            if(userInfo){
                if(userInfo.password != password){
                    res.send({
                        code:502,
                        message:'密码错误'
                    })
                    }else{
                        res.send({
                            code:200,
                            message:'登录成功',
                            userInfo:userInfo
                        })
                    }        
            }else{
                res.send({
                    code:400,
                    message:'账户不存在'
                })
            }
      }catch(e){
        console.log(e)  
        res.send({
            code:400,
            message:'用户名不存在'
        })
      }
    })(username)
})
//注册请求
app.post('/register',async(req,res)=>{
    let {username,password} = req.body;
        try {
            let userInfo = await userModle.findOne({username})
            if(userInfo){
                res.send({
                    code:402,
                    message:'用户已经存在',
                })
            }else{
                let userInfo = await userModle.create({username,password})
                res.send({
                    code:200,
                    message:'成功注册',
                    userInfo
                })
            }
        } catch (error) {
            res.send({
                code:500,
                data:'暂时无法注册，稍后重试'
            })
            
        }
    })
//请求猫眼电影数据
app.get('/catmovie',(req,res)=>{
  res.status(200).json(catmovie)
})
//民宿guesthouse
app.get('/guesthouse',(req,res)=>{
  res.status(200).json(guesthouse)
})
//获取城市 /citys
app.get('/citys',(req,res)=>{
  res.status(200).json(citys)
})
//猜你喜欢
app.get('/like',(req,res)=>{
  res.status(200).json(like)
})
//收藏商家
app.get('/merchant',(req,res)=>{
  res.status(200).json(merchant)
})
//全部订单
app.get('/order',(req,res)=>{
  res.status(200).json(order)
})
//个人信息
app.get('/persnal',(req,res)=>{
  res.status(200).json(persnal)
})
//收藏团购
app.get('/buying',(req,res)=>{
  res.status(200).json(buying)
})
//美食
app.get('/getpoilist',(req,res)=>{
  res.status(200).json(getPoiList)
})
//评论
app.get('/pinglun',(req,res)=>{
  res.status(200).json(pinglun)
})
//美食详情
app.get('/fooddetail',(req,res)=>{
  res.status(200).json(fooddetail)
})
//猜你喜欢商家
app.get('/shopLike',(req,res)=>{
  res.status(200).json(shopLike)
})
app.listen('3000',()=>{
  console.log('服务以启动');
})