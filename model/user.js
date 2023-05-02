const pool = require("../config/db.js")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {
    static async saveUserDetails(fname, lname, email, password) {
        const conn = await pool.getConnection();
        try {
            const sql = `INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)`;
            const [rows, fields] = await conn.execute(sql, [fname, lname, email, password]);
            return rows.insertId;
        } catch (err) {
            console.error(`Error creating user ${fname}: ${err.message}`);
            throw err;
        } finally {
            conn.release();
        }
    }

    // static async findByUsername(username) {
    //     const conn = await pool.getConnection();
    //     try {
    //       const sql = `SELECT * FROM users WHERE username = ?`;
    //       const [rows, fields] = await conn.execute(sql, [username]);
    //       return rows[0];
    //     } catch (err) {
    //       console.error(`Error finding user ${username}: ${err.message}`);
    //       throw err;
    //     } finally {
    //       conn.release();
    //     }
    //   }

    static async findByEmailAndPassword(email, password) {
        const conn = await pool.getConnection();
        try {

            const sql = `SELECT * FROM users WHERE email = ? `;
            const [rows] = await conn.execute(sql, [email]);

            if (rows.length === 0) {
                return null;
            }

            const userData = rows[0]
            const passwordMatches = await bcrypt.compare(password, userData.password)

            if (!passwordMatches) {
                return null
            }

            return userData;

        } catch (err) {
            console.error(`Error finding user with email and password ${email} ${password}: ${err.message}`);
            throw err;
        } finally {
            conn.release();
        }
    }
    static async generateAuthToken(email) {
        const token = jwt.sign({ email: email }, 'your-secret-key');
        return token;
    }

    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
    static async getAllProductsDetails(){
        const conn = await pool.getConnection();
        try {

            const sql = `SELECT * FROM products `;
            const [rows] = await conn.execute(sql, []);

            return rows

        } catch (err) {

            throw err

        }


    }

    static async getUserDetailsByEmail(email) {
        const conn = await pool.getConnection();

        try {

            const sql = `SELECT fname,lname,email FROM users WHERE email = ? `;
            const [rows] = await conn.execute(sql, [email]);

            return rows

        } catch (err) {

            throw err

        }
    }

    static async getProductDetailsById(id){
        const conn = await pool.getConnection();

        try{

            const sql = `SELECT * FROM products WHERE id = ? `;
            const [rows] = await conn.execute(sql, [id]);

            return rows

        }catch(err){

            throw err
            
        }
    }
    static async saveCartDetails(obj){
        const conn = await pool.getConnection();
        try {
            // const sql = `INSERT INTO cartList (productId, productName, productPrice, productCategory,quantity,userEmail,description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            // const [rows] = await conn.execute(sql, [obj.productId, obj.productName, obj.productPrice, obj.productCategory,obj.quantity,obj.userEmail,obj.description]);
            // return rows;

            const sql = `INSERT INTO cartList (productId, productName, productPrice, productCategory,quantity,userEmail,description)
                 VALUES (?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE 
                 productName = VALUES(productName), 
                 productPrice = VALUES(productPrice),
                 productCategory = VALUES(productCategory),
                 quantity = VALUES(quantity),
                 description = VALUES(description)`;
            const [rows] = await conn.execute(sql, [obj.productId, obj.productName, obj.productPrice, obj.productCategory, obj.quantity, obj.userEmail, obj.description]);
            return rows;
        } catch (err) {
            console.error(`Error saving cart details ${obj}: ${err.message}`);
            throw err;
        } finally {
            conn.release();
        }
    }

    static async getUserCartList(email){
        
        const conn = await pool.getConnection();
        try{

            const sql = `SELECT * FROM cartList WHERE userEmail = ? `;
            const [rows] = await conn.execute(sql, [email]);

            return rows

        }catch(err){

            throw err
            
        }
    }

    static async cartItemDelete(email, id) {
        const conn = await pool.getConnection();
        try {
          const sql = `DELETE FROM cartList WHERE userEmail = ? AND productId = ?`;
          const [result] = await conn.execute(sql, [email, id]);
          return result.affectedRows > 0;
        } catch (err) {
          throw err;
        } 
      }
      
}

module.exports = User;