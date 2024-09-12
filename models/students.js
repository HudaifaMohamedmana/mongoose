const mongoose = require("mongoose");
const studentschema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    grade: Number,
    
  });
  // Declares a new model Schema and its properties
  
  const Student = mongoose.model("Students", studentschema);
  // Access to monggose variables to connect the Schema and our CRUD routes
      // ie: Students.find()
  
  module.exports = Student;
  
  // Schema?: We create Models for our data and funnel the instances of those models through the routes we created.