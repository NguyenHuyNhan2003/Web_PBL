const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const pages = new Schema({
    name: {type: String,maxlength:600},
    like: {type: String},
    follow:{type:String}

},{
    timestamps:true
});
module.exports = mongoose.model('pages',pages);

