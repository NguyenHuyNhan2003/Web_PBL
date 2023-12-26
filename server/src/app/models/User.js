const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator');
const { use } = require('../../routes/page');

const nodemailer = require("nodemailer");

const Users = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    role: {
        type:String,
        required: true
    }
    
},{
    timestamps:true
});

// add user 
Users.statics.addUser = async function(email, password, role) {
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

    const user = await this.create({email, password: hass, role})

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
// change password method
Users.statics.change_pass = async function(email, password){

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough!")
    }

    const match = await bcrypt.compare(password, user.password)

    if(match){
        throw Error('New password must be different from the old one')
    }

    //hassing password
    const salt = await bcrypt.genSalt(10)
    const hass = await bcrypt.hash(password, salt)

    const user = await this.findOneAndUpdate({email}, {password: hass})

    return user
}

Users.statics.notify_newrecuitments = async function(congti, diadiem, vitri){
    const users = await this.find({});

    const sender = process.env.EMAIL;

    const config = {
      service: "gmail",
      auth: {
        user: sender,
        pass: process.env.MAIL_PASS,
      },
    };

    const transporter = nodemailer.createTransport(config);

    users.forEach(async (user) => {
        const mailOptions = {
            from: sender,
            to: user.email,
            subject: 'New Recruitment Notification',
            text: `Dear ${user.email},\n\nThere are new recruitments for ${congti}:
                    \n${diadiem}
                    \n${vitri}
                    \nCheck it out at our website!`

        }
        await transporter.sendMail(mailOptions);
    });

    console.log('Emails sent to all users.');
}

module.exports = mongoose.model('Users',Users);
