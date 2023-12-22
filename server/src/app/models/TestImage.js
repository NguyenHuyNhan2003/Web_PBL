const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const test = new Schema({
    name : String ,
    image : String 
},{
    timestamps:true
});
module.exports = mongoose.model('testimage',test);
