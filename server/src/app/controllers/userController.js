const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
require('dotenv').config()

class userController{

    createToken = (_id) => {
        return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
    }

    loginUser = async(req, res) =>{
        const {email, password} = req.body

        try{
            const user = await User.login(email, password)
            // create token
            const token = this.createToken(user._id)
            const role = user.role
            console.log(user)
            res.status(200).json({email, token,role})
        } catch (error){
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    addUser = async(req, res) =>{
        const {email, password} = req.body
        //----admin account
        // const email = "email@gmail.com"
        // const password = "123qweQWE!@#"
        // const role = "admin"

        const role = "user"
        try{
            const user = await User.addUser(email, password, role)
            const token = this.createToken(user._id)
            
            console.log(user)
            //send mail
            const config = {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.MAIL_PASS
                }
            }

            const transporter = nodemailer.createTransport(config)

            const mail = {
                from: process.env.EMAIL,
                to: email,
                subject: 'ĐĂNG KÝ THÀNH CÔNG',
                text: 'Bạn đã tạo thành công tài khoản với mật khẩu: ' + password,
            }
        
            transporter.sendMail(mail)

            res.status(200).json({email, token, role})
        } catch (error){
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    update_user_role = async(req, res) =>{
        const {email} = req.body

        const user = await User.findOneAndUpdate({email}, {role: 'admin'})

        if(!user){
            res.status(400).json({error: "can't find user"})
        }

        res.status(200).json({user})
    }

    demote_user_role = async(req, res) =>{
        const {email} = req.body // email muốn thăng quyền
        const {current_email} = req.user // nhận email đã được gán sau requireAuth

        if(current_email == email){
            res.status(400).json({error: "can't demote your self"})
        }

        const user = await User.findOneAndUpdate({email}, {role: 'user'})

        if(!user){
            res.status(400).json({error: "can't find user"})
        }

        res.status(200).json({user})
    }

    change_password = async(req, res) =>{
        const {email} = req.user // nhận email đã được gán sau requireAuth
        const {new_password} = req.body // mật khẩu mới

        try{
            const user = await User.change_pass(email, new_password)
            console.log(user)
            res.status(200).json({email, user})
        }catch(error){
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = new userController
