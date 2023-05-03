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

const productItemDelete =  async(req,res,next)=>{
    const { id } = req.body;
  
    try {
      const deletedCartProductItem = await Admin.productItemDelete(id);


      if (!deletedCartProductItem) {
        return res.status(401).json({ message: "Unable to delete product item" });
      }
  
      return res.status(201).json({ message: "product item deleted successfully" });
    } catch(err) {
      return res.status(401).json({ message: "Something went wrong", error: err });
    }
}

const updateProductItem = async(req,res,next)=>{
    const {id,name,price,description,category} = req.body
    const productObject = {
        id,
        name,
        price,
        description,
        category
    }
  
    try {
      const updateProductItem = await Admin.productItemUpdate(productObject);


      if (!updateProductItem) {
        return res.status(401).json({ message: "Unable to update product item" });
      }
  
      return res.status(201).json({ message: "product item update successfully" });
    } catch(err) {
      return res.status(401).json({ message: "Something went wrong", error: err });
    }
}

const getAllProducts = async(req,res,next)=>{
    try {

        const products = await Admin.getAllProductsDetails()

        if(!products){
            return res.status(401).json({ message: 'product isnt available' });
        }

        return res.status(201).json({ productList: products })


    } catch (err) {
        
        return next(err);
    }

}

const getAllUsers =  async(req,res,next)=>{
    try {

        const users = await Admin.getAllUserDetails()

        if(!users){
            return res.status(401).json({ message: 'user isnt available' });
        }

        return res.status(201).json({ userList: users })


    } catch (err) {
        
        return next(err);
    }

}

const getCartList = async(req,res,next)=>{
    try {

        const cartList = await Admin.getCartListDetails()

        if(!cartList){
            return res.status(401).json({ message: 'cart list isnt available' });
        }

        return res.status(201).json({ cartList: cartList })


    } catch (err) {
        
        return next(err);
    }
}

const updateUserDetails = async(req,res,next)=>{
    const {fname,lname,email,password,isAdmin} = req.body
    const userObject = {
        fname,
        lname,
        email,
        password,
        isAdmin
    }
  
    try {
      const userDetails = await Admin.userDetailsUpdate(userObject);


      if (!userDetails) {
        return res.status(401).json({ message: "Unable to update user details" });
      }
  
      return res.status(201).json({ message: "user details update successfully" });
    } catch(err) {
      return res.status(401).json({ message: "Something went wrong", error: err });
    }
}



module.exports = {adminLogin,addProducts,productItemDelete,updateProductItem,getAllProducts,getAllUsers,getCartList,updateUserDetails}