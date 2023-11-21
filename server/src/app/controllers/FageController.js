const express = require('express');
const { mongooseToObject} = require('../util/mongose');
const {mutipleMongooseToObject} = require('../util/mongose');
const router = express.Router();
const pangeFb = require('../models/Fanpage');
const reacts = require('../models/Reacts');

class FanpageController{
    //get [/data/]
    show(req,res){
        res.send("Danh Sách Người Dùng");
    }
    index(req,res,next){
       pangeFb.find({})
        .then((data)=>{
            console.log('Found record:', data);
            res.json(data);
        
        })
        .catch(next);
    }
    react(req,res,next){
        reacts.find({})
        .then((data)=>{
            console.log('Found record:', data);
            res.json(data);
        })
        .catch(next);
    }
}
module.exports = new FanpageController;


