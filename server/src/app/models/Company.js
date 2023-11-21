const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;
const company = new Schema({
    employer : {type:String},
    language : {type:String},
    linhvuc : {type:String},
    name : {type:String, maxlength:600},
    vitri : {type:String},
    image : {type:String}
},{
    timestamps:true
});
module.exports = mongoose.model('company',company);