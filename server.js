require("dotenv").config();
const express = require("express")
const routes = require("./routes/routes.js");

const PORT = process.env.PORT || 3000;

const app = express()

// ------------------------- Database_Connection

const connectToDb = require("./db/conn");
const Student = require("./models/students.js");
connectToDb();

app.use(express.json());
//-----------------------------
app.use((req, res, next) => {
  console.log(`A request happened: ${req.method} ${req.url}`);
  next();
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------
// // +++++++++++++ {READ} ++++++++++++++
app.get("/", async (req, res) => {
  res.send(" hello: world" );
});

app.get("/Student", async (req, res) => {
  const students = await Student.find()
  res.json({students})
});

app.get("/student/:id", async (req, res) => {
  const studentId = req.params.id
  const student = await Student.findById(studentId)
  res.json({student})

});

// // +++++++++++++ {CREATE} ++++++++++++++

app.post("/Student", async (req, res) => {
  // 1. Get data from req.body
  // 2.Create Students by passing data above into model Schema
  // 3. Respond with copy of new Students
  const name = req.body.name;
  const grade = req.body.grade;
  // // ------------------------------(1)
  const student = await Student.create({
    name: name,
    grade: grade,
  });
  // // ------------------------------(2)
  res.json({student});
  // ------------------------------(3)
});

// // +++++++++++++ {UPDATE} ++++++++++++++

app.put("/Student/:id", async (req, res) => {
  // 1.Get the id off the url
  // 2. Get the Data off the Body
  // 3. Find and update Students
  // 4. Retrieve updatedStudents and send it as a response
   // ------------------------------(1)
const studentId = req.params.id
  const {name,grade} = req.body;
  // const stu = await Student.findByIdAndUpdate(studentId,{name:name,grade:grade})

  // ------------------------------(2)
  const student = await Student.findByIdAndUpdate(studentId, {name: name,grade: grade});
  // // ------------------------------(3)
  const updatedStudents = await Student.findById(studentId);
  res.json({updatedStudents});
  // ------------------------------(4)
});
// // +++++++++++++ {DELETE} ++++++++++++++

app.delete("/Student/:id", async (req, res) => {
  // 1. Get id off url
  // 2. Delete the record
  // 3. Send a Response to confirm deletion
  const StudentId = req.params.id;
  // ------------------------------(1)
  await Student.deleteOne({
    id: StudentId,
  });
  // ------------------------------(2)
res.json({success:"Record Deleted Successfully"} );
  // ------------------------------(3)
});




// ----------------------- server start -------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});