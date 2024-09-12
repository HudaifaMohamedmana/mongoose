const Student = require('../models/students')

const fetchStudents = async (req, res) => {
  // 1. Get all Students from database.
  // 2. Send them as a response
  const Students = await Student.find();
  res.json({ Students: Students });
};

const fetchStudent = async (req, res) => {
  // 1. Get id off the url
  // 2. Find the Students using that id
  // 3. Send response with that Students as the payload
  const StudentsId = req.params.id;
  // ------------------------------(1)
  const Students = await Students.findById(StudentsId);
  // ------------------------------(2)
  res.json({ Students: Students });
  // ------------------------------(3)
};

const createStudents = async (req, res) => {
  // 1. Get data from req.body
  // 2.Create Students by passing data above into model Schema
  // 3. Respond with copy of new Students
  // const title = req.body.title;
  // const body = req.body.body;
  const {body} = req.body

  // ------------------------------(1)
  const Students = await Students.create({
    title: title,
    body: body,
  });
  // ------------------------------(2)
  res.json({ Students: Students });
  // ------------------------------(3)
};

const updateStudents = async (req, res) => {
  // 1.Get the id off the url
  // 2. Get the Data off the Body
  // 3. Find and update Students
  // 4. Retrieve updatedStudents and send it as a response

  const StudentsId = req.params.id;
  // ------------------------------(1)
  // const title = req.body.title;
  // const body = req.body.body;
const {title,body} = req.body
  // ------------------------------(2)
  const Students = await Students.findByIdAndUpdate(StudentsId, {
    title: title,
    body: body,
  });
  // ------------------------------(3)
  const updatedStudents = await Students.findById(StudentsId);
  res.json({ Students: updatedStudents });
  // ------------------------------(4)
};
const deleteStudents = async (req, res) => {
  // 1. Get id off url
  // 2. Delete the record
  // 3. Send a Response to confirm deletion
  const StudentsId = req.params.id;
  // ------------------------------(1)
  await Students.deleteOne({
    id: StudentsId,
  });
  // ------------------------------(2)
  res.json({ success: "Record Deleted Successfully" });
  // ------------------------------(3)
};

module.exports = {
  fetchStudents,
  fetchStudent,
  updateStudents,
  createStudents,
  deleteStudents
};