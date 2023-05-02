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

    static async saveProductDetails(obj){
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

}

module.exports = Admin