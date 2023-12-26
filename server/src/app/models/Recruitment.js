const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recruitments = new Schema({
    congti: {type: String},
    luong :{type: String},
    vitri:{type:String},
    khuvuc: {type:String},
    level: {type:String},
    anh: {type:String},
    language :{type:String},
    timedang:{type : String},
    id:{type:String},
    soluong:{type:String},
    kinhnghiem:{type:String},
    bangcap:{type:String},
    mota:{type:String},
    yeucau:{type:String},
    comments: { type: [String], default: [] }
},{
    timestamps:true
});
module.exports = mongoose.model('recruitments',recruitments);


// soluong: '',
//     kinhnghiem: '',
//     bangcap: '',
//     mota: '',
//     yeucau: ''