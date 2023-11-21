const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
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

            console.log(user)
            res.status(200).json({email, token})
        } catch (error){
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

    addUser = async(req, res) =>{
        const {email, password} = req.body
        //const email = "email@gmail.com"
        //const password = "1234"

        try{
            const user = await User.addUser(email, password)
            //const token = this.createToken(user._id)

            console.log(user)
            res.status(200).json({email, user})
            //res.status(200).json({email, token})
        } catch (error){
            console.log(error.message)
            res.status(400).json({error: error.message})
        }
    }

}

module.exports = new userController