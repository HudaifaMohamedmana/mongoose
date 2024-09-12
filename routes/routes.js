const express = require("express");
const dbconnect = require("../db/conn.js");
const router = express.Router();


// console.log(db)
router.get("/", async (req, res) => {
    let db = await dbconnect()
    let collection = await db.collection("grades")
    let resulte = await collection.find({}).limit(50).toArray();
    res.send(resulte).status(200);
});

// Export the router
module.exports = router;