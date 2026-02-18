const bcrypt = require('bcrypt');
const pool = require('../pool.js');

const userQueries = {
    createNewUser: async (username, firstname, lastname, email, password) => {
        const client = await pool.connect();
        try {
            if (!this.checkUsernameUnique(username)) {
                return
            }
            const hashedpassword = await bcrypt.hash(password, 10);
            await client.query(`
                INSERT INTO users (username, firstname, lastname, email, password)
                VALUES ($1,$2,$3,$4,$5)
            `, [username, firstname, lastname, email, hashedpassword])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    checkUsernameUnique: async (username) => {
        const client = await pool.connect();
        try {
            return await client.query(`
                SELECT *
                FROM users
                WHERE username = $1
            `, [username])
        } catch (error) {
            throw error
        }
    },
    verifyPassword: async (username, password) => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT *
                FROM users
                WHERE username = $1
            `, [username])
            const userPassword = data.rows.password
            return bcrypt.compare(password, userPassword)
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    logInUser: async () => {
        const client = await pool.connect();
        try {
            
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    deleteUser: async () => {
        const client = await pool.connect();
        try {
            
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    }, 
    updateUser: async () => {
        const client = await pool.connect();
        try {
            
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    }
}
module.exports = userQueries;