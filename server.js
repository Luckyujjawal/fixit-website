Const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "fixit-secret";

/* ================= DATABASE (FIXED) ================= */

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => {
    console.log("Mongo Error ❌", err);
    process.exit(1);
  });

/* ================= MODELS ================= */

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.send("Fixit Pro Server Running 🚀");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
