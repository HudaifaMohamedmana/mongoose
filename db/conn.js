require('dotenv').config();

const mongoose = require('mongoose');

const dbconnect = async() => {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log(`sample_training`)
}

module.exports = dbconnect;