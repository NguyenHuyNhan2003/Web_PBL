const express = require('express');
const { mongooseToObject, mutipleMongooseToObject } = require('../util/mongose');
const router = express.Router();
const CompanyModel = require('../models/Company');
const Recruitment = require('../models/Recruitment');

class CompanyController {
    show(req, res, next) {
        CompanyModel.find({})
            .then((data) => {
                console.log('Found record:', data);
                res.json(data);
            })
            .catch(next);
    }
    searchselect(req, res, next) {
        const { q } = req.query;
        console.log(q);
        if(q!='all'){
        CompanyModel.find({ vitri: { $regex: new RegExp(q, 'i') } })
            .then((result) => {
                console.log(result);
                res.json(result);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
        }
        else{
            CompanyModel.find({})
            .then((data) => {
                console.log('Found record:', data);
                res.json(data);
            })
            .catch(next);
        }
    }

    // tìm kiếm theo language 
    // searchInput(req, res, next) {
    //     const { q, diadiem, luong } = req.query;
    //     const regex = new RegExp(q, 'i');
    //    console.log(diadiem);
    //     Recruitment.find({ language: regex })
    //       .then((result) => {
    //         console.log(result);
    //         res.json(result);
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //         res.status(500).json({ error: 'Internal Server Error' });
    //       });
    //   }  
      // tìm kiếm theo language và địa điểm 
      searchInput(req, res, next) {
        const { q, diadiem, luong } = req.query;
        // Construct the search criteria
        const searchCriteria = {};
        const regex = new RegExp(q, 'i');
        // th: có địa điểm , có input , but all
        if (diadiem && q && diadiem !='all') {
          searchCriteria.language = regex;
            searchCriteria.khuvuc = new RegExp(diadiem, 'i');
            Recruitment.find(searchCriteria)
            .then((result) => {
                res.json(result);
                console.log(result);
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
        }
        // diadiem =all ,but input 
        else if(diadiem =='all' && !q){
          Recruitment.find({})
          .then((data)=>{
           console.log('Found record:', data);
           res.json(data);    
       })
       .catch(next);
        }
        // th : có mỗi diadiem 
        else if(diadiem && !q  ){
          const regex = new RegExp(diadiem, 'i');
          Recruitment.find({ khuvuc: regex })
          .then((result) => {
            console.log(result);
            res.json(result);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          });  
        }
        // tìm theo ngôn ngữ
        else {
          const regex = new RegExp(q, 'i');
            console.log(diadiem);
              Recruitment.find({ language: regex })
                .then((result) => {
                  console.log(result);
                  res.json(result);
                })
                .catch((error) => {
                  console.error(error);
                  res.status(500).json({ error: 'Internal Server Error' });
                });  
        }
        // Add other criteria if needed...
        // Perform the search
    }  
}
module.exports = new CompanyController();
