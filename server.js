require("dotenv").config();
const express = require("express")
const routes = require("./routes/routes.js");
const PORT = process.env.PORT || 3000;

const app = express()

// ------------------------- Database_Connection

const connectToDb = require("./db/conn");
connectToDb();

//-----------------------------
app.use((req, res, next) => {
  console.log(`A request happened: ${req.method} ${req.url}`);
  next();
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------
app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/Students", async (req, res) => {
  // Get all Students from database.
  let db = await connectToDb()
  let collection = await db.collection("grades")
  const Students = await collection.find().limit(50).toArray();
  // Send them as a response
  res.send(Students).status(200);
});
app.get("/notes", async (req, res) => {
  // Get all notes from database.
  const notes = await Note.find();
  // Send them as a response
  res.json({ notes: notes });
});
// // +++++++++++++ {READ} ++++++++++++++

// app.get("/Students/:id", async (req, res) => {
//   // 1. Get id off the url
//   // 2. Find the Students using that id
//   // 3. Send response with that Students as the payload
//   const StudentsId = req.params.id;
//   // ------------------------------(1)
//   const Students = await Students.findById(StudentsId);
//   // ------------------------------(2)
//   res.json({ Students: Students });
//   // ------------------------------(3)
// });
// // +++++++++++++ {CREATE} ++++++++++++++

// app.post("/Students", async (req, res) => {
//   // 1. Get data from req.body
//   // 2.Create Students by passing data above into model Schema
//   // 3. Respond with copy of new Students
//   const title = req.body.title;
//   const body = req.body.body;
//   // ------------------------------(1)
//   const Students = await Students.create({
//     title: title,
//     body: body,
//   });
//   // ------------------------------(2)
//   res.json({ Students: Students });
//   // ------------------------------(3)
// });

// // +++++++++++++ {UPDATE} ++++++++++++++

// app.put("/Students/:id", async (req, res) => {
//   // 1.Get the id off the url
//   // 2. Get the Data off the Body
//   // 3. Find and update Students
//   // 4. Retrieve updatedStudents and send it as a response

//   const StudentsId = req.params.id;
//   // ------------------------------(1)
//   const title = req.body.title;
//   const body = req.body.body;
//   // ------------------------------(2)
//   const Students = await Students.findByIdAndUpdate(StudentsId, {
//     title: title,
//     body: body,
//   });
//   // ------------------------------(3)
//   const updatedStudents = await Students.findById(StudentsId);
//   res.json({ Students: updatedStudents });
//   // ------------------------------(4)
// });
// // +++++++++++++ {DELETE} ++++++++++++++

// app.delete("/Students/:id", async (req, res) => {
//   // 1. Get id off url
//   // 2. Delete the record
//   // 3. Send a Response to confirm deletion
//   const StudentsId = req.params.id;
//   // ------------------------------(1)
//   await Students.deleteOne({
//     id: StudentsId,
//   });
//   // ------------------------------(2)
//   res.json({ success: "Record Deleted Successfully" });
//   // ------------------------------(3)
// });




// ----------------------- server start -------------------
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});