const express = require("express");
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("../util/mongose");
const router = express.Router();
const CompanyModel = require("../models/Company");
const Recruitment = require("../models/Recruitment");

class CompanyController {
  show(req, res, next) {
    CompanyModel.find({})
      .then((data) => {
        console.log("Found record:", data);
        res.json(data);
      })
      .catch(next);
  }
  searchselect(req, res, next) {
    const { q } = req.query;
    console.log(q);
    if (q != "all") {
      CompanyModel.find({ vitri: { $regex: new RegExp(q, "i") } })
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    } else {
      CompanyModel.find({})
        .then((data) => {
          console.log("Found record:", data);
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
    const { q, diadiem, luong, vitri } = req.query;
    console.log("vitri", vitri);
    const levelsArray = vitri.split(",");
    console.log(levelsArray);
    // Construct the search criteria
    const searchCriteria = {};
    const regex = new RegExp(q, "i");
    // th: có địa điểm , có input , but all
    if (diadiem && q && diadiem != "all") {
      searchCriteria.language = regex;
      searchCriteria.khuvuc = new RegExp(diadiem, "i");
      Recruitment.find(searchCriteria)
        .sort({ timedang: -1 })
        .then((result) => {
          res.json(result);
          console.log(result);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
    // diadiem =all ,but input not
    else if (diadiem == "all" && !q && !luong) {
      Recruitment.find({})
        .then((data) => {
          console.log("Found record:", data);
          res.json(data);
        })
        .catch(next);
    }
    // th : có mỗi diadiem
    else if (diadiem && !q && !luong) {
      console.log("11");
      const regex = new RegExp(diadiem, "i");
      Recruitment.find({ khuvuc: regex })
        .sort({ timedang: -1 })
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }
    //  tìm theo mỗi lương
    else if (!diadiem && !q && luong) {
      console.log(luong);
      if (luong === "10-15") {
        searchSalaryInRange(10, 15);
      } else if (luong === "15-25") {
        searchSalaryInRange(15, 25);
      } else if (luong == "trên 20") {
      } else {
        Recruitment.find({});
      }
    }
    // Tìm kiếm theo level
    else if (!diadiem && !q && !luong && vitri) {
      Recruitment.find({
        level: {
          $exists: true,
          $in: levelsArray.map((level) => new RegExp(level, "i")),
        },
      })
        .then((result) => {
          res.json(result);
          // Xử lý kết quả tìm kiếm ở đây
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // tìm kiếm theo diadia va luong
    else if (!q && diadiem && luong && !vitri) {
      console.log("1");
      if (diadiem == "all") {
        if (luong === "10-15") {
          searchSalaryInRange(10, 15);
        } else if (luong === "15-25") {
          searchSalaryInRange(15, 25);
        } else if (luong == "trên 20") {
        } else if (luong == "all") {
          Recruitment.find({})
            .then((data) => {
              console.log("Found record:", data);
              res.json(data);
            })
            .catch(next);
        }
      }
      // diadiem khác và luong
      else {
        if (luong === "10-15") {
          searchRecruitment("10", "15", diadiem);
        } else if (luong === "15-25") {
          searchRecruitment("15", "25", diadiem);
        } else if (luong == "trên 20") {
        }
      }
    }
    // lỗi
    else if(!q && diadiem && luong && vitri ){
      if(diadiem =="all" && luong == "all" && vitri =="tatcaapbac"){
          Recruitment.find({})
            .then((data) => {
              console.log("Found record:", data);
              res.json(data);
            })
            .catch(next);
      }
      else if(diadiem !="all" && luong !="all" && vitri !="tatcaapbac"){
        if (luong === "10-15") {
          searchRecruitment1(10, 15, diadiem, levelsArray);
        } else if (luong === "15-25") {
          searchRecruitment1(15, 25, diadiem, levelsArray);
        } 
        else{

        }
     
      }
    }
    
    
    // tim kiem theo diadiem , luong ,cấp bậc



    // tìm theo ngôn ngữ
    else {
      const regex = new RegExp(q, "i");
      console.log(diadiem);
      Recruitment.find({ language: regex })
        .sort({ timedang: -1 })
        .then((result) => {
          console.log(result);
          res.json(result);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        });
    }

    // tìm kiếm theo lương
    async function searchSalaryInRange(ten, fifteen) {
      try {
        const results = await Recruitment.find({
          luong: { $regex: /\d+/, $gt: ten, $lt: fifteen },
        }).then((data) => {
          return res.json(data);
          console.log(results);
        });
      } catch (error) {
        console.error(error);
      }
    }
    // hàm tìm kiếm theo luong , khu vuc
    async function searchRecruitment(ten, fifteen, diadiem) {
      try {
        const luongCondition = {
          luong: { $regex: /\d+/, $gt: ten, $lt: fifteen },
        };

        const khuvucCondition = {
          khuvuc: new RegExp(diadiem, "i"),
        };

        const results = await Recruitment.find({
          $and: [luongCondition, khuvucCondition],
        }).sort({ timedang: -1 });

        console.log(results);
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  // tìm kiếm theo diadiem , luong , level 
    async function searchRecruitment1(ten, fifteen, diadiem, levelsArray) {
      try {
        const luongCondition = {
          luong: { $regex: /\d+/, $gt: ten, $lt: fifteen },
        };
    
        const khuvucCondition = {
          khuvuc: new RegExp(diadiem, "i"),
        };
    
        const levelCondition = {
          level: {
            $exists: true,
            $in: levelsArray.map((level) => new RegExp(level, "i")),
          },
        };
    
        const results = await Recruitment.find({
          $and: [luongCondition, khuvucCondition, levelCondition],
        }).sort({ timedang: -1 });
    
        console.log(results);
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
    
  }
}
module.exports = new CompanyController();
