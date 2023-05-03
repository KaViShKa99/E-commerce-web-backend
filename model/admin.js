const pool = require("../config/db.js")
const bcrypt = require('bcrypt');

class Admin {
    static async findByEmailAndPassword(email, password) {
        const conn = await pool.getConnection();
        try {

            const sql = `SELECT * FROM admin WHERE email = ? `;
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
            console.error(`Error finding admin with email and password ${email} ${password}: ${err.message}`);
            throw err;
        } finally {
            conn.release();
        }
    }
    static async generateAuthToken(email) {
        const token = jwt.sign({ email: email }, 'your-secret-key');
        return token;
    }

    static async saveProductDetails(obj) {
        const conn = await pool.getConnection();

        try {

            const sql = `INSERT INTO products (name, price, description, category)
            VALUES (?, ?, ?, ?)`;
            const [rows] = await conn.execute(sql, [obj.name, obj.price, obj.description, obj.category]);
            return rows;

        } catch (err) {
            console.error(`Error saving product details  ${obj}: ${err.message}`);
            throw err;

        }
    }

    static async productItemDelete(id) {
        const conn = await pool.getConnection();

        try {
            const sql = `DELETE FROM products WHERE id = ? `;
            const [result] = await conn.execute(sql, [id]);

            return result.affectedRows > 0;
        } catch (err) {

            throw err;
        }
    }

    static async productItemUpdate(productObject) {

        const conn = await pool.getConnection();

        try {
            const { id, name, price, description, category } = productObject;

            const sql = `UPDATE products SET name=?, price=?, description=?, category=? WHERE id=?`;
            const [result] = await conn.execute(sql, [name, price, description, category, id]);
            return result.affectedRows > 0;

        } catch (err) {

            throw err;
        }
    }

    static async getAllProductsDetails() {
        const conn = await pool.getConnection();
        try {

            const sql = `SELECT * FROM products `;
            const [rows] = await conn.execute(sql, []);

            return rows

        } catch (err) {

            throw err

        }

    }

    static async getAllUserDetails() {
        const conn = await pool.getConnection();
        try {

            const sql = `SELECT fname,lname,email,isAdmin FROM users `;
            const [rows] = await conn.execute(sql, []);

            return rows

        } catch (err) {

            throw err

        }
    }

    static async getCartListDetails() {
        const conn = await pool.getConnection();
        try {

            const sql = `SELECT * FROM cartlist `;
            const [rows] = await conn.execute(sql, []);

            return rows

        } catch (err) {

            throw err

        }
    }

    static async userDetailsUpdate(userObject) {
        const conn = await pool.getConnection();

        try {
            const { fname, lname, email, isAdmin } = userObject;

            const sql = `UPDATE users SET fname=?, lname=?, email=?, isAdmin=? WHERE email=?`;
            const [result] = await conn.execute(sql, [fname, lname, email, isAdmin, email]);
            return result.affectedRows > 0;

        } catch (err) {

            throw err;
        }
    }


}

module.exports = Admin