const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Blogs = new Schema({
    id  :{type:String},
    title: {type: String},
    time: {type:String},
    desc: {type:String}
},{
    timestamps:true
});
module.exports = mongoose.model('Blogs',Blogs);

