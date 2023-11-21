const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator');
const { use } = require('../../routes/page');

const Users = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required: true
    }
    
},{
    timestamps:true
});

// add user 
Users.statics.addUser = async function(email, password) {
    //validation
    if(!email || !password){
        throw Error("No empty field!")
    }
    
    if(!validator.isEmail(email)){
        throw Error("Invalid email!")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough!")
    }

    const exists = await this.findOne({email})

    if(exists){
        throw Error("Email already in use!")
    }
    //hassing password
    const salt = await bcrypt.genSalt(10)
    const hass = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hass})

    return user
}
// login method
Users.statics.login = async function(email, password){
    //validation
    if(!email || !password){
        throw Error("No empty field!")
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error("Can't find user")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Invalid login')
    }

    return user
}

module.exports = mongoose.model('Users',Users);