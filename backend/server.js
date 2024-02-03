const express = require("express");
const session = require("express-session")
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const passport = require("passport")
const multer = require("multer")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// const passportLocalMongoose = require("passport-local-mongoose");
// const findOrCreate = require("mongoose-findorcreate");


  
// .env config
dotenv.config()


//router import 
const userRoutes = require("./routes/userRoutes.js");
const googleRoutes = require('./routes/googleUserRoutes.js')
const bookRoutes = require('./routes/bookRoutes.js')
const authRoutes = require('./routes/authRoutes.js')

//mongodb connection
connectDB()

//rest object
const app = express();


app.use(cors({
  origin: ["https://mybook-client.vercel.app"],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true
}));
// app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: false }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'));
app.use(morgan("dev"));
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
  

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/auth", authRoutes)
app.use(googleRoutes)
app.use("/api/v1/book", bookRoutes)

app.get("/", (req, res) => {
  res.send("APP IS RUNNING!")
})



//Port 
const PORT = process.env.PORT || 8080



app.listen(PORT, ()=>{
    console.log(`Server Running on port number ${PORT}`.bgCyan
    .white)
})

export default app;
