const mongoose = require('mongoose');
require('dotenv').config()

async function connect() {
    try {
        //'mongodb://localhost:27017/dulieu'
        await mongoose.connect('mongodb://localhost:27017/dulieu', {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        family: 4,
        });
        console.log("Kết nối thành công");
    } catch (error) {
        console.error("Kết nối thất bại:", error);
    }
}

module.exports = { connect };
