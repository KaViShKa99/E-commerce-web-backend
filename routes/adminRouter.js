const express = require("express")
const userRouter = express.Router();

userRouter.post("/login", [userSignInValidationRules(), validateSignin], logIn)
userRouter.post("/signup", [userSignUpValidationRules(), validateSignup], signUp)



module.exports = userRouter;