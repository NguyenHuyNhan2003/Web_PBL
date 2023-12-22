const mongoose = require('mongoose');
require('dotenv').config()

async function connect() {
    try {
        await mongoose.connect(process.env.mongoURI, {
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

