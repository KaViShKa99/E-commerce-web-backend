const express = require("express")
const userRouter = express.Router();
const {userSignInValidationRules,validateSignin} = require('../config/validator')
const {adminLogin,addProducts} = require("../controller/admin-controller");

userRouter.post("/login", [userSignInValidationRules(), validateSignin], adminLogin)
userRouter.post("/addproduct", addProducts)




module.exports = userRouter;