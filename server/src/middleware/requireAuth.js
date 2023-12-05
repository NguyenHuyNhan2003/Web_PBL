const jwt = require('jsonwebtoken')
const User = require('../app/models/User')
require('dotenv').config()

// const requireAuth = async (req, res, next) => {
//     // verify authentication
//     const {authorization} = req.headers //lấy token từ header
//     const token = authorization//.split('.')[1]
//     // console.log("token: " + token)
//     try{
//         const {_id} = jwt.verify(token, process.env.SECRET)
//         // console.log("id: " +_id)
//         req.user = await User.findOne({_id}).select('email') //gán email cho request qua req.user để có thể sử dụng trong các router dưới
//         next()

//     }catch(error){
//         console.log(error)
//         res.status(401).json({error: "Request not authorized"})
//     }
// }

class requireAuth{
    AuthAdmin = async (req, res, next) => {
        // verify authentication
        const {authorization} = req.headers //lấy token từ header
    
        if(!authorization){
            res.status(401).json({error: "Authorization token required"})
        }
    
        const token = authorization.split(' ')[1]
        console.log(token);
        try{
            const {_id} = jwt.verify(token, process.env.SECRET)
            console.log(_id)
            const info = await User.findOne({_id}).select('email role')
            console.log("lỗi")
            console.log(info);
            if(info.role == 'admin'){ // kiểm tra có là admin
                req.user = info.email //gán email cho request qua req.user để có thể sử dụng trong các router dưới
                next()
            }else{
                res.status(401).json({error : null})
            }

        }catch(error){
            console.log(error)
            res.status(401).json({error: "Request not authorized"})
        }
    }

    AuthUser = async (req, res, next) => {
        // verify authentication
        const {authorization} = req.headers //lấy token từ header
    
        if(!authorization){
            res.status(401).json({error: "Authorization token required"})
        }
    
        const token = authorization.split(' ')[1]
        console.log(token);
        try{
            console.log("Test")
            const {_id} = jwt.verify(token, process.env.SECRET)
            req.user = await User.findOne({_id}).select('email') //gán email cho request qua req.user để có thể sử dụng trong các router dưới
            next()
    
        }catch(error){
            res.status(401).json({error: "Request not authorized"})
        }
    }
}

module.exports = new requireAuth