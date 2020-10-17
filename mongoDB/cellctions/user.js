const mongoose = require('mongoose')
// 创建约束
const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:Number,
        require:true,
    }
})
//创建文档对象
const userModle = new mongoose.model('administrator',userSchema)
module.exports = userModle