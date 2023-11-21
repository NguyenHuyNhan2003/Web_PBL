const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;
const reacts = new Schema({
    text : {type:String},
    like : {type:String},
    love : {type:String},
    care : {type:String},
    haha : {type:String},
    angry : {type:String},
    react: {type: String,maxlength:600},
    comment: {type: String},
    share:{type:String}
},{
    timestamps:true
});
module.exports = mongoose.model('reacts',reacts);