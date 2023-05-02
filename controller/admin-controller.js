const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');

const adminLogin =  async (req,res,next)=>{
    const { email, password } = req.body

    try {

        const user = await Admin.findByEmailAndPassword(email, password)

        if (!user) {
            return res.status(401).json({ status:400,message: 'Invalid email or password' });
        }

        const token = await Admin.generateAuthToken(email)
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

const addProducts = async (req,res,next)=>{

    const {name,price,description,category} = req.body
    const productObject = {
        name,
        price,
        description,
        category
    }

    try {

        const product = await Admin.saveProductDetails(productObject)

        if (!product) {
            return res.status(401).json({ status:400,message: 'product details isnt saving' });
        }

        return res.status(201).json({cartDetails:"product details saved"})

    }catch(err){
        return res.status(401).json({message:err})
    }
}

module.exports = {adminLogin,addProducts}