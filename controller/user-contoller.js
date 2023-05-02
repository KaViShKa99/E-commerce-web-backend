const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');



const signUp = async (req, res, next) => {

    const { fname, lname, email, password } = req.body;

    try {
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.saveUserDetails(fname, lname, email, hashedPassword);
    
        return res.status(201).json({ 
            status:200 , 
            message: "sign up successfully" 
        });

    } catch (err) {
        
        return res.status(401).json({ status:400, message: "email already exists" })
    }

}

const logIn = async (req, res, next) => {

    const { email, password } = req.body

    try {

        const user = await User.findByEmailAndPassword(email, password)

        if (!user) {
            return res.status(401).json({ status:400,message: 'Invalid email or password' });
        }

        const token = await User.generateAuthToken(email)
        return res.status(201).json({ 
            status:200,
            message:"login successful!",
            token: token ,
            email:email
        });

    } catch (err) {
        return next(err);
    }
}

const logOut = async (req, res, next) => {
    req.session.destroy();
    return res.redirect('/');
}
const getAllProducts = async (req, res, next) => {

    try {

        const products = await User.getAllProductsDetails()

        if(!products){
            return res.status(401).json({ message: 'product isnt available' });
        }

        return res.status(201).json({ productList: products })


    } catch (err) {
        console.log(err)
        return next(err);
    }
}

const getUserDetails = async (req, res, next) => {

    const {email} = req.params

    try {

        const userDetails = await User.getUserDetailsByEmail(email)

        if (!userDetails) {
            return res.status(401).json({ message: "user details isnt available" });
        }

        return res.status(201).json({ message:userDetails })

    } catch (err) {
        return res.status(401).json({ message: err });
    }
}

const getProductDetails = async(req,res,next)=>{
    const {id} = req.params
    
    try{

        const productDetails = await User.getProductDetailsById(id)
        console.log('sss ',productDetails.length);

        if(productDetails.length === 0){
            return res.status(401).json({ message: 'product details not available' });
        }

        return res.status(201).json({userDetails:productDetails})

    }catch(err){
        return res.status(401).json({ message: err })
    }
}

const saveCartDetails = async(req,res,next)=>{
    const {productId,productName,productPrice,productCategory,quantity,userEmail,description} = req.body

    const cartObject = {
        productId,
        productName,
        productPrice,
        productCategory,
        quantity,
        userEmail,
        description
    }

    try{

        const cartDetails = await User.saveCartDetails(cartObject)
        
        if(!cartDetails){
            return res.status(401).json({ message: "cart details isnt saving" });
        }

        return res.status(201).json({cartDetails:"cart details saved"})

    }catch(err){
        return res.status(401).json({message:err})
    }

}

const getCartItems = async(req,res,next)=>{

    const {email} = req.params

    try{

        const userCartList = await User.getUserCartList(email)
        
        if(!userCartList){
            return res.status(401).json({ message: "user cart details isn't saving" });
        }

        return res.status(201).json({cartDetails:userCartList})

    }catch(err){
        return res.status(401).json({message:err})
    }
}

const cartItemDelete = async(req, res, next) => {
    const { email, id } = req.body;
  
    try {
      const deletedCartItem = await User.cartItemDelete(email, id);


      if (!deletedCartItem) {
        return res.status(401).json({ message: "Unable to delete cart item" });
      }
  
      return res.status(201).json({ message: "Cart item deleted successfully" });
    } catch(err) {
      return res.status(401).json({ message: "Something went wrong", error: err });
    }
  }
  



module.exports = {signUp ,logIn,logOut,getAllProducts,getUserDetails,getProductDetails,saveCartDetails,getCartItems,cartItemDelete};
