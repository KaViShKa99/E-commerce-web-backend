const express = require("express")
const userRouter = express.Router();
const {signUp ,logIn ,logOut,getAllProducts,getUserDetails,getProductDetails } = require("../controller/user-contoller");
const {userSignUpValidationRules,userSignInValidationRules,validateSignup,validateSignin} = require('../config/validator')
const middleware = require('../middleware/middleware')



userRouter.post("/login", [userSignInValidationRules(), validateSignin], logIn)
userRouter.post("/signup", [userSignUpValidationRules(), validateSignup], signUp)
// userRouter.post("/signup",[middle1ware.isNotLoggedIn,userSignUpValidationRules(),validateSignup],signUp)
userRouter.get("/logout", logOut)
// userRouter.get("/getallproducts/:name",getAllProducts)
userRouter.get("/getallproducts",getAllProducts)
userRouter.get("/getuserdetails/:email",getUserDetails)
userRouter.get("/getproductdetails/:id",getProductDetails)


module.exports = userRouter;
