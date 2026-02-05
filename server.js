[1:22 am, 06/02/2026] ujjawal jha: /* =========================
   FIXIT PRO - ALL IN ONE
========================= */

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "fixit-secret";

/* ================= DATABASE ================= */

mongoose.connect("mongodb://127.0.0.1:27017/fixitUltimate");

/* ================= FRONTEND ================= */

app.get("/", (req, res) => {
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>FIXIT PRO</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<style>

/* ===== RESET ===== */
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Segoe UI',sans-serif;
}

/* ===== GRADIENT BACKGROUND ===== */
body{
  height:100vh;
  background:linear-gradient(135deg,#667eea,#764ba2);
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
}

/* ===== GLASS CARD ===== */
.app{
  width:95%;
  max-width:1200px;
  height:95vh;
  background:rgba(255,255,255,.12);
  backdrop-filter:blur(25px);
  border-radius:25px;
  padding:25px;
  color:white;
  box-shadow:0 25px 60px rgba(0,0,0,.5);
  overflow:auto;
}

/* ===== HEADER ===== */
.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:25px;
}

.logo{
  font-size:28px;
  font-weight:bold;
  letter-spacing:2px;
}

.btn{
  background:#00f2fe;
  border:none;
  padding:10px 18px;
  border-radius:12px;
  cursor:pointer;
  font-weight:bold;
  transition:.3s;
}

.btn:hover{
  transform:scale(1.1);
}

/* ===== GRID ===== */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:20px;
}

/* ===== CARDS ===== */
.card{
  background:rgba(255,255,255,.18);
  border-radius:18px;
  padding:20px;
  text-align:center;
  transition:.3s;
}

.card:hover{
  transform:translateY(-8px);
}

.icon{
  font-size:50px;
  margin-bottom:10px;
}

/* ===== SEARCH ===== */
.search{
  margin:20px 0;
  display:flex;
  gap:10px;
}

input,select{
  padding:10px;
  border-radius:10px;
  border:none;
  flex:1;
}

</style>
</head>

<body>

<div class="app">

<div class="header">
  <div class="logo">🔧 FIXIT PRO</div>
  <button class="btn">Login</button>
</div>

<h2>Find Trusted Services Near You</h2>

<div class="search">
  <select>
    <option>Plumber</option>
    <option>Electrician</option>
    <option>AC Repair</option>
    <option>Carpenter</option>
  </select>
  <input placeholder="Enter location">
  <button class="btn">Search</button>
</div>

<div class="grid">

  <div class="card">
    <span class="material-icons icon">plumbing</span>
    <h3>Plumber</h3>
  </div>

  <div class="card">
    <span class="material-icons icon">electrical_services</span>
    <h3>Electrician</h3>
  </div>

  <div class="card">
    <span class="material-icons icon">ac_unit</span>
    <h3>AC Repair</h3>
  </div>

  <div class="card">
    <span class="material-icons icon">handyman</span>
    <h3>Carpenter</h3>
  </div>

</div>

</div>
</body>
</html>
`);
});

/* ================= SERVER ================= */

app.listen(5000,'0.0.0.0',()=>{
  console.log("Server running on port 5000");
});
[1:40 am, 06/02/2026] ujjawal jha: /* =====================================
   FIXIT PRO 2.0 – MODERN UI EDITION
   New Font + Animated Gradient + Glass
===================================== */

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRET = "fixit-secret";

/* ================= DATABASE ================= */

mongoose.connect(
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/fixitUltimate"
);

/* ================= MODELS ================= */

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

const Provider = mongoose.model("Provider", {
  name: String,
  service: String,
});

/* ================= AUTH ================= */

app.post("/signup", async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  await User.create({ ...req.body, password: hash });
  res.send("Signup Success");
});

app.post("/login", async (req, res) => {
  const u = await User.findOne({ email: req.body.email });
  if (!u) return res.sendStatus(401);

  const ok = await bcrypt.compare(req.body.password, u.password);
  if (!ok) return res.sendStatus(401);

  const token = jwt.sign({ id: u._id }, SECRET);
  res.json({ token });
});

/* ================= FRONTEND ================= */

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
<head>

<title>Fixit Pro</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- 🔥 NEW GOOGLE FONTS -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Orbitron:wght@700&display=swap" rel="stylesheet">

<style>

/* ================= RESET ================= */
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Poppins',sans-serif;
}

/* ================= ANIMATED BG ================= */
body{
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;

  background: linear-gradient(-45deg,#667eea,#764ba2,#00c6ff,#0072ff);
  background-size:400% 400%;
  animation:bgMove 10s infinite linear;
}

@keyframes bgMove{
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}

/* ================= GLASS CONTAINER ================= */
.app{
  width:95%;
  max-width:1100px;
  padding:40px;
  border-radius:25px;

  background:rgba(255,255,255,.12);
  backdrop-filter:blur(20px);

  box-shadow:0 30px 60px rgba(0,0,0,.35);

  color:white;
  text-align:center;
}

/* ================= LOGO FONT ================= */
.logo{
  font-family:'Orbitron',sans-serif;
  font-size:42px;
  letter-spacing:3px;
  font-weight:bold;
  margin-bottom:10px;
}

/* ================= SUBTEXT ================= */
.subtitle{
  opacity:.85;
  margin-bottom:30px;
}

/* ================= GRID ================= */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(150px,1fr));
  gap:18px;
}

/* ================= CARDS ================= */
.card{
  padding:25px;
  border-radius:18px;

  background:rgba(255,255,255,.25);
  backdrop-filter:blur(10px);

  font-weight:600;
  cursor:pointer;

  transition:.3s;
}

.card:hover{
  transform:translateY(-8px) scale(1.05);
  background:white;
  color:#333;
}

/* ================= BUTTON ================= */
.btn{
  margin-top:35px;
  padding:12px 30px;
  border:none;
  border-radius:12px;

  font-weight:600;
  background:white;
  color:#333;
  cursor:pointer;

  transition:.3s;
}

.btn:hover{
  transform:scale(1.08);
}

/* ================= FOOTER ================= */
.footer{
  margin-top:25px;
  font-size:13px;
  opacity:.7;
}

</style>
</head>

<body>

<div class="app">

  <div class="logo">🔧 FIXIT PRO</div>
  <div class="subtitle">Professional Home Services Platform</div>

  <div class="grid">
    <div class="card">🚿 Plumber</div>
    <div class="card">🔌 Electrician</div>
    <div class="card">❄️ AC Repair</div>
    <div class="card">🪵 Carpenter</div>
    <div class="card">🎨 Painter</div>
    <div class="card">🧹 Cleaning</div>
  </div>

  <button class="btn" onclick="alert('Backend Connected Successfully 🚀')">
    Test Server
  </button>

  <div class="footer">Fixit Pro © 2026 | Modern UI Version</div>

</div>

</body>
</html>
`);
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
