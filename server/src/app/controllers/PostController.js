const express = require('express');
const { mongooseToObject} = require('../util/mongose');
const {mutipleMongooseToObject} = require('../util/mongose');
const router = express.Router();
const Posts = require('../models/Post');
const Recruitment = require('../models/Recruitment');
class PostController{
//delete [post/delete/:id]
deletebyid(req,res,next){
    const id = req.params.id;
    console.log(id);
    Recruitment.findByIdAndDelete({_id:id})
        .then((result)=>{
            console.log("Thành công xóa");  
            return res.json(result);
        })
        .catch(next);
}
//put [post//update/recuitment/:_id']
updatebyid(req, res, next) {
    console.log(req.body);
    const id = req.params._id;
    console.log(id);
    // Use findByIdAndUpdate instead of updateOne for better compatibility
    Recruitment.findByIdAndUpdate({_id:id}, req.body, { new: true, runValidators: true })
        .then(data => {
            if (!data) {
                // If no document was found with the given _id
                return res.status(404).json({ message: 'Document not found.' });
            }
            console.log('Thành công cmnr');
            res.json({ message: 'Cập Nhật Thành Công' });
        })
        .catch(err => {
            // Pass the error to the error handling middleware
            next(err);
        });
}
//'/edit/recuitment/:_id'
editbyid(req,res,next){
    const id = req.params._id;
    console.log(id);
    Recruitment.findOne({_id:id})
        .then((data)=>{
            res.json(data);
        })
        .catch(next);
}
//get[post/cruitment]
cruitment(req,res,next){
    Recruitment.find({})
        .then((data)=>{
            console.log(data);
            res.json(data);
        })
}
    //get [post/by/:id]
getbyid(req, res, next) {
    const idd = req.params.id;
    console.log(idd);
        Posts.findOne({id:idd})
            .then(element => {
                console.log(element);
                res.json(element);
              
            })
            .catch(next);
        }
 //get [/data/]
 show(req,res,next){
  Posts.find({})
   .then((data)=>{
       console.log('Found record:', data);
       res.json(data);     
   })
   .catch(next);
}
create(req,res,next){
   Recruitment.find({})
       .then((data)=>{
           console.log('Found record:', data);
           res.json(data);    
       })
       .catch(next);
}
createpost(req,res,next){
   const recruitment = new Recruitment(req.body);
   recruitment.save()
   .then(savedRecruitment => {
    console.log('Recruitment saved:', savedRecruitment);
    res.status(201).json({
      message: 'Recruitment created successfully',
      recruitment: savedRecruitment
    });
  })
       .catch(error => {
           console.error('Error saving recruitment:', error);
       })
    }
scrape = async(req,res,next) => {
    exec('py scraper.py', (error, stdout, stderr) => {
        if (error) {
            console.error(error.message);
            return;
        }
        console.log("Function executed successfully: ", stdout);
    });
}
}

module.exports = new PostController;


