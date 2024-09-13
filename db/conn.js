require('dotenv').config();

const mongoose = require('mongoose');

const dbconnect = async() => {
    await mongoose.connect(process.env.ATLAS_URI);
    // sample_training
    console.log(`connected to mongoose`)
}

module.exports = dbconnect;