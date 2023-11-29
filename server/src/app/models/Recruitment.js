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
    id:{type:String}
},{
    timestamps:true
});
module.exports = mongoose.model('recruitments',recruitments);


