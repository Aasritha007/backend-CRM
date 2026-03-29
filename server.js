const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Lead = require("./models/Lead");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/crm");

// ADD LEAD
app.post("/add", async (req, res) => {
  const lead = new Lead(req.body);
  await lead.save();
  res.send("Lead Added");
});

// GET LEADS
app.get("/leads", async (req, res) => {
  const leads = await Lead.find();
  res.json(leads);
});

// UPDATE STATUS
app.put("/update/:id", async (req, res) => {
  await Lead.findByIdAndUpdate(req.params.id, req.body);
  res.send("Updated");
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running on 5000"));