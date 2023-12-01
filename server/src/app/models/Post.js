const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Posts = new Schema({
    id  :{type:String},
    text: {type: String},
    time: {type:String},
    post_url: {type:String}
},{
    timestamps:true
});
module.exports = mongoose.model('Posts',Posts);

