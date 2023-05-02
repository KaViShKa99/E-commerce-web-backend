const express = require("express")
const userRouter = express.Router();
const {userSignInValidationRules,validateSignin} = require('../config/validator')
const {adminLogin,addProducts,productItemDelete,updateProductItem,getAllProducts,getAllUsers,getCartList} = require("../controller/admin-controller");

userRouter.post("/login", [userSignInValidationRules(), validateSignin], adminLogin)
userRouter.post("/addproduct", addProducts)
userRouter.post("/deleteproductitem", productItemDelete)
userRouter.post("/updateproductitem", updateProductItem)
userRouter.get("/getallproducts", getAllProducts)
userRouter.get("/getallusers", getAllUsers)
userRouter.get("/getcartlist", getCartList)




module.exports = userRouter;