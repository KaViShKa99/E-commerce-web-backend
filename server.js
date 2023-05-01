const express = require("express");
const session = require('express-session');
const cors = require('cors');
const userRouter = require('./routes/userRouter')
// const adminRouter = require('./routes/adminRouter')


const app = express()
app.use(cors());
app.use(express.json());

app.use("/user", userRouter)
// app.use("/admin", adminRouter)

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.listen(5000, () => console.log("app started at 5000..."));