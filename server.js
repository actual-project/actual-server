const express = require('express')
const path = require('path')
//建立数据库链接
require('./mongoDB/db')
//引入集合
const userModle = require('./mongoDB/cellctions/user')
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
        console.log(username,password);
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


    app.listen('3000',()=>{
  console.log('服务以启动');
})