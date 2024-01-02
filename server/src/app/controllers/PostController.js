const express = require("express");
const { mongooseToObject } = require("../util/mongose");
const { mutipleMongooseToObject } = require("../util/mongose");
const router = express.Router();
const Posts = require("../models/Post");
const Users = require("../models/User")
const Recruitment = require("../models/Recruitment");
const Image = require("../models/TestImage");

const nodemailer = require("nodemailer");

const multer = require("multer");
const path = require("path");
require("dotenv").config();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (res, file, cb) =>{
    if(file.mimetype === 'application/pdf'){
      cb(null, true);
    }else{
      cb(new Error('Only PDF files are allowed'));
    }
  }
}).single('cv');

class PostController {
  // post upload
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/Images");
      },
      filename: (req, file, cb) => {
        cb(
          null,
          file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
      },
    });
    this.upload = multer({
      storage: this.storage,
    });
  }
  postUpload(req, res, next) {
    // console.log(req.file)
    console.log(req);
    Image.create({ image: req.file.filename })
      .then((result) => {
        console.log(res.json(result));
      })
      .catch((err) => console.log(err));
  }
  getImage(req, res, next) {
    Image.find({})
      .then((image) => res.json(image))
      .catch((err) => res.json(err));
  }

  //delete [post/delete/:id]
  deletebyid(req, res, next) {
    const id = req.params.id;
    console.log(id);
    Recruitment.findByIdAndDelete({ _id: id })
      .then((result) => {
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
    Recruitment.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        if (!data) {
          // If no document was found with the given _id
          return res.status(404).json({ message: "Document not found." });
        }
        console.log("Thành công cmnr");
        res.json({ message: "Cập Nhật Thành Công" });
      })
      .catch((err) => {
        // Pass the error to the error handling middleware
        next(err);
      });
  }
  //'/edit/recuitment/:_id'
  editbyid(req, res, next) {
    const id = req.params._id;
    console.log(id);
    Recruitment.findOne({ _id: id })
      .then((data) => {
        res.json(data);
      })
      .catch(next);
  }
  //get[post/cruitment]
  cruitment(req, res, next) {
    Recruitment.find({})
      .sort({ timedang: -1 }) // Sắp xếp theo trường timedang giảm dần
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

  //get [post/by/:id]
  getbyid(req, res, next) {
    const idd = req.params.id;
    console.log(idd);
    Posts.findOne({ id: idd })
      .then((element) => {
        console.log(element);
        res.json(element);
      })
      .catch(next);
  }
  // get [post/recruitment/by/id]
  getrecruitmentbyid(req, res, next) {
    const idd = req.params.id;
    console.log(idd);
    Recruitment.findById({ _id: idd })
      .then((element) => {
        console.log(element);
        res.json(element);
      })
      .catch(next);
  }
  //get [/data/]
  
  show(req, res, next) {
    console.log("1");
    Posts.find({})
      .sort({time: -1}) // Sắp xếp theo thời gian giảm dần
      .then((data) => {
        console.log("Found record:", data);
        res.json(data);
      })
      .catch(next);
  }

  create(req, res, next) {
    Recruitment.find({})
      .sort({ timedang: -1 })
      .then((data) => {
        console.log("Found record:", data);
        res.json(data);
      })
      .catch(next);
  }
  createpost(req, res, next) {
console.log(req.file)
const anh = req.file.filename;
// Access other form data
const { congti, luong, vitri, khuvuc, level, timedang, language, id, soluong, kinhnghiem, bangcap, mota, yeucau } = req.body;
    // Tạo đối tượng Recruitment với tất cả thuộc tính
    const recruitment = new Recruitment({
      congti,
      luong,
      vitri,
      khuvuc,
      level,
      timedang,
      language,
      id,
      soluong,
      kinhnghiem,
      bangcap,
      mota,
      yeucau,
      anh,
    });

    // Lưu đối tượng vào cơ sở dữ liệu
    recruitment
      .save()
      .then((savedRecruitment) => {
        console.log("Recruitment saved:", savedRecruitment);

        Users.notify_newrecuitments(savedRecruitment.congti, savedRecruitment.khuvuc, savedRecruitment.vitri)

        res.status(201).json({
          message: "Recruitment created successfully",
          recruitment: savedRecruitment,
        });
      })
      .catch((error) => {
        console.error("Error saving recruitment:", error);
        res.status(500).json({ message: "Internal Server Error" });
      });
  }

  send_gmail = async (req, res) => {
    try{
      await upload(req, res, (err) =>{
        if(err){
          res.status(500).json({error: err.message});
        }
        const { cv, congti, email, fullname, introduction, phonenumber } = req.body;
        //https://ethereal.email/create tạo email để test
        const sender = process.env.EMAIL;

        const config = {
          service: "gmail",
          auth: {
            user: sender,
            pass: process.env.MAIL_PASS,
          },
        };
        const transporter = nodemailer.createTransport(config);
        const mail = {
          from: sender,
          to: email,
          subject: "ĐĂNG KÝ ỨNG TUYỂN",
          text:
            "Company: " +
            congti +
            "\n" +
            "Email: " +
            email +
            "\n" +
            "Name: " +
            fullname +
            "\n" +
            "Introduction: " +
            introduction +
            "\n" +
            "Phone number: " +
            phonenumber +
            "\n",
          attachments:[
            {
              filename: 'cv.pdf',
              content: req.file.buffer,
              encoding: 'base64'
            }
          ]
        };
        transporter.sendMail(mail).then((result) => {
            res.status(200).json({ result });
          }).catch((error) => {
            res.status(400).json({ error: error.message });
          });
      });
    }catch(error){
      res.status(500).json({error: error.message});
    }
  };

  commentPost = async (req, res, next) => {
    try {
      const  id  = req.params.id;
      const { value } = req.body;
  

      const post = await Recruitment.findById({_id:id});
  
      if (!post) {
        return res.status(404).json({ error: 'Recruitment post not found' });
      }
  
      console.log(post);
      console.log(id + "    " + value);
  
      // Update the comments array
      post.comments.push(value);
  
      // Save the updated document
      const updatedPost = await post.save();
  
      // Send the updated document as the response
      console.log(updatedPost);
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  


}

module.exports = new PostController();
