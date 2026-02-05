/* =========================
   FIXIT PRO - ALL IN ONE
   Full Professional App
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

const User = mongoose.model("User", {
  name:String,
  email:String,
  password:String,
  role:{type:String,default:"user"}
});

const Provider = mongoose.model("Provider",{
  name:String,
  phone:String,
  service:String,
  lat:Number,
  lng:Number,
  rating:{type:Number,default:5}
});

const Review = mongoose.model("Review",{
  providerId:String,
  rating:Number,
  comment:String
});

/* ================= AUTH ================= */

function auth(req,res,next){
  const token=req.headers.authorization;
  if(!token) return res.sendStatus(401);
  req.user=jwt.verify(token,SECRET);
  next();
}

/* ================= AUTH ROUTES ================= */

app.post("/signup", async(req,res)=>{
  const hash=await bcrypt.hash(req.body.password,10);
  await User.create({...req.body,password:hash});
  res.send("ok");
});

app.post("/login", async(req,res)=>{
  const u=await User.findOne({email:req.body.email});
  if(!u) return res.sendStatus(401);

  const ok=await bcrypt.compare(req.body.password,u.password);
  if(!ok) return res.sendStatus(401);

  const token=jwt.sign({id:u._id,role:u.role},SECRET);
  res.json({token});
});

/* ================= PROVIDERS ================= */

app.post("/provider",auth,async(req,res)=>{
  await Provider.create(req.body);
  res.send("added");
});

app.get("/providers",async(req,res)=>{
  const list=await Provider.find({service:req.query.service}).sort({rating:-1});
  res.json(list);
});

/* ================= REVIEWS ================= */

app.post("/review",auth,async(req,res)=>{
  await Review.create(req.body);

  const all=await Review.find({providerId:req.body.providerId});
  const avg=all.reduce((a,b)=>a+b.rating,0)/all.length;

  await Provider.findByIdAndUpdate(req.body.providerId,{rating:avg});

  res.send("review added");
});

/* ================= ADMIN ================= */

app.get("/admin",auth,async(req,res)=>{
  if(req.user.role!=="admin") return res.sendStatus(403);

  res.json({
    users:await User.countDocuments(),
    providers:await Provider.countDocuments(),
    reviews:await Review.countDocuments()
  });
});

/* ================= FRONTEND ================= */

app.get("/",(req,res)=>{
res.send(`
<!DOCTYPE html>
<html>
<head>
<title>FIXIT Pro</title>
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

/* ===== GRADIENT BG ===== */
body{
  height:100vh;
  background:linear-gradient(135deg,#00c6ff,#0072ff);
  display:flex;
  justify-content:center;
  align-items:center;
}

/* ===== GLASS APP ===== */
.app{
  width:95%;
  max-width:1200px;
  height:92vh;

  background:rgba(255,255,255,.12);
  backdrop-filter:blur(18px);

  border-radius:25px;
  box-shadow:0 25px 60px rgba(0,0,0,.4);

  padding:25px;
  color:white;
  overflow:auto;
}

/* ===== HERO IMAGE ===== */
.hero{
  width:100%;
  height:180px;
  border-radius:18px;
  overflow:hidden;
  margin-bottom:20px;
}

.hero img{
  width:100%;
  height:100%;
  object-fit:cover;
}

/* ===== HEADER ===== */
.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}

.logo{
  font-size:28px;
  font-weight:bold;
}

/* ===== SEARCH ===== */
.search{
  display:flex;
  gap:10px;
}

input,select{
  padding:10px;
  border-radius:10px;
  border:none;
}

button{
  padding:10px 15px;
  border:none;
  border-radius:10px;
  background:#00f2fe;
  font-weight:bold;
  cursor:pointer;
}

/* ===== GRID ===== */
.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}

.card{
  background:rgba(255,255,255,.18);
  padding:20px;
  border-radius:18px;
}

.service{
  display:flex;
  gap:10px;
  padding:10px;
  margin:8px 0;
  background:white;
  color:black;
  border-radius:10px;
}

.material-icons{
  font-size:22px;
}

#map{
  height:300px;
  border-radius:15px;
}

</style>
</head>

<body>

<div class="app">

  <!-- 🔥 HERO IMAGE ADDED HERE -->
  <div class="hero">
    <img src="https://www.istockphoto.com/photos/beautiful-plumber">
  </div>

  <!-- HEADER -->
  <div class="header">
    <div class="logo">🔧 FIXIT</div>

    <div class="search">
      <select>
        <option>Plumber</option>
        <option>Electrician</option>
        <option>AC Repair</option>
      </select>
      <input placeholder="Enter location">
      <button>Search</button>
    </div>
  </div>

  <!-- GRID -->
  <div class="grid">

    <div class="card">
      <h3>Services</h3>
      <div class="service"><span class="material-icons">plumbing</span> Plumbing</div>
      <div class="service"><span class="material-icons">electrical_services</span> Electrician</div>
      <div class="service"><span class="material-icons">ac_unit</span> AC Repair</div>
    </div>

    <div class="card">
      <h3>Nearby Providers</h3>
      <div id="map"></div>
    </div>

  </div>

</div>

<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_KEY"></script>
<script>
navigator.geolocation.getCurrentPosition(p=>{
  new google.maps.Map(document.getElementById("map"),{
    center:{lat:p.coords.latitude,lng:p.coords.longitude},
    zoom:14
  })
})
</script>

</body>
</html>
`);
});

/* ================= SERVER ================= */

app.listen(5000, '0.0.0.0', () => {
  console.log("🚀 Server running on:");
  console.log("Local  : http://localhost:5000");
  console.log("Network: http://192.168.1.59:5000");
});