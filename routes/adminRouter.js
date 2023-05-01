const express = require("express")
const userRouter = express.Router();
const {userSignInValidationRules,validateSignin} = require('../config/validator')
const {adminLogin} = require("../controller/admin-controller");

userRouter.post("/login", [userSignInValidationRules(), validateSignin], adminLogin)




module.exports = userRouter;