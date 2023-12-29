const express = require("express");
const { mongooseToObject } = require("../util/mongose");
const { mutipleMongooseToObject } = require("../util/mongose");
const router = express.Router();
const Blog = require('../models/Blog')
const nodemailer = require("nodemailer");

const multer = require("multer");
const path = require("path");
require("dotenv").config();

class BlogController{
    show(req,res,next){
        Blog.find()
            .then((data)=>{
                res.json(data)
            })
            .catch((error)=>{
                res.status(500).json({ message: "Internal Server Error" });
            })
    }
    getbyid(req,res,next){
        const _id = req.params._id;
        Blog.findById({_id : _id})
            .then((data)=>{
                res.json(data);
                console.log(data)
            })
            .catch((error)=>{
                res.status(500).json({ message: "Internal Server Error" });
            });
    }
}
module.exports = new BlogController();