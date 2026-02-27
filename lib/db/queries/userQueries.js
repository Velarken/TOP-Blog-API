const bcrypt = require('bcrypt');
const pool = require('../pool.js');

const userQueries = {
    createNewUser: async (username, firstname, lastname, email, password) => {
        const client = await pool.connect();
        try {
            if (userQueries.checkUsernameUnique(username) !== 'undefined') {
                console.log('Account already exists with this username.')
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
            const userPassword = data.rows[0].password
            const compare = await bcrypt.compare(password, userPassword)
            console.log(compare)
            return compare;
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    logInUser: async (username, password) => {
        const client = await pool.connect();
        try {
            const verifyUser = userQueries.verifyPassword(username, password);
            if (!verifyUser) {
                console.log('Incorrect Password!')
            }
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
    },
    makeAdmin: async (id) => {

    },
    allowPostsFromUser: async (id) => {

    },
    disallowPostsFromUser: async (id) => {

    }
}
module.exports = userQueries;