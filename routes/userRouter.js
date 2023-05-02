const express = require("express")
const userRouter = express.Router();
const {signUp ,logIn ,logOut,getAllProducts,getUserDetails,getProductDetails,saveCartDetails,getCartItems,cartItemDelete} = require("../controller/user-contoller");
const {userSignUpValidationRules,userSignInValidationRules,validateSignup,validateSignin} = require('../config/validator')




userRouter.post("/login", [userSignInValidationRules(), validateSignin], logIn)
userRouter.post("/signup", [userSignUpValidationRules(), validateSignup], signUp)
userRouter.get("/logout", logOut)
userRouter.get("/getallproducts",getAllProducts)
userRouter.get("/getuserdetails/:email",getUserDetails)
userRouter.get("/getproductdetails/:id",getProductDetails)
userRouter.post("/addtocart",saveCartDetails)
userRouter.get("/getcartitems/:email",getCartItems)
userRouter.post("/deletecartitem",cartItemDelete)



module.exports = userRouter;
