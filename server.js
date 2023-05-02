const express = require("express");
const session = require('express-session');
require('dotenv').config();
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')


const app = express()
app.use(cors());
app.use(express.json());

app.use("/user", userRouter)
app.use("/admin", adminRouter)

app.use(session({
  secret: process.env.SERVER_SECRET_KEY,
  resave: false,
  saveUninitialized: false
}));


app.listen(process.env.PORT, () => console.log("app started at 5000..."));