const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');



const signUp = async (req, res, next) => {

    const { fname, lname, email, password } = req.body;

    try {
        // const existingUser = await User.findByUsername(username);
        // if (existingUser) {
        // return res.status(409).json({ error: 'Username already exists' });
        // }

        // const existingEmail = await User.findByEmail(email);
        // if (existingEmail) {
        // return res.status(409).json({ error: 'Email already exists' });
        // }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create(fname, lname, email, hashedPassword);
        // if(!user){
        //     return res.status(401).json({ message:"email already exists" });
        // }

        return res.status(201).json({ 
            status:200 , 
            message: "sign up successfully" 
        });

    } catch (err) {
        // return next(err)
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
            return res.status(401).json({ message: 'user details not available' });
        }

        return res.status(201).json({ userDetails: userDetails })

    } catch (err) {

    }
}

const getProductDetails = async(req,res,next)=>{
    const {id} = req.params
    
    try{

        const userDetails = await User.getProductDetailsById(id)

        if(!userDetails){
            return res.status(401).json({ message: 'product details not available' });
        }

        return res.status(201).json({userDetails:userDetails})

    }catch(err){
        return res.status(401).json({ message: err })
    }
}

module.exports = {signUp ,logIn,logOut,getAllProducts,getUserDetails,getProductDetails};
