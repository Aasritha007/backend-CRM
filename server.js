const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Lead = require("./models/Lead");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes

// ADD LEAD
app.post("/add", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.send("Lead Added");
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET LEADS
app.get("/leads", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE
app.put("/update/:id", async (req, res) => {
  try {
    await Lead.findByIdAndUpdate(req.params.id, req.body);
    res.send("Updated");
  } catch (err) {
    res.status(500).send(err);
  }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.send("Deleted");
  } catch (err) {
    res.status(500).send(err);
  }
});

// PORT (IMPORTANT FOR DEPLOYMENT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
