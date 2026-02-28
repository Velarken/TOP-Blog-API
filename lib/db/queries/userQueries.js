const bcrypt = require('bcrypt');
const pool = require('../pool.js');

const userQueries = {
    findUser: async (id) => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT * FROM user
                WHERE id = $1    
            `, [id])
            const userData = data.rows;
            return userData
        } catch (error) {
            throw error
        } finally {
            client.release
        }
    },
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
    logInUser: async (username) => {
        const client = await pool.connect();
        try {
            const validateUserInput = await pool.query(`
                SELECT * FROM users
                WHERE username = $1
            `, [username])
            const user = validateUserInput.rows;
            return user;
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    deleteUser: async (userid, username) => {
        const client = await pool.connect();
        try {
            await client.query(`
                DELETE FROM user
                WHERE id = $1 AND username = $2    
            `, [userid, username])
            return
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    }, 
    updateUserName: async (userid, firstname, lastname) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE user 
                SET firstname = $2, lastname = $3
                WHERE id = $1

            `, [userid, firstname, lastname])
        } catch (error) {
            throw error
        }
    },
    updateUserAlias: async (id, username) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE user 
                SET username = $1
                WHERE id = $2

            `, [username, id])
            return
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    updateUserPassword: async (id, password) => {
        const client = await pool.connect();
        try {
            const hashedpassword = await bcrypt.hash(password, 10);
            await client.query(`
                UPDATE user
                SET password = $1
                WHERE id = $2
            `, [hashedpassword, id])
            return
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    makeAdmin: async (id) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE user
                SET "isAdmin" = true
                WHERE id = $1
            `, [id])
            return
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    removeAdmin: async (id) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE user
                SET "isAdmin" = false
                WHERE id = $1
            `, [id])
            return
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    allowPostsFromUser: async (id) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE user
                SET "canPublish" = true
                WHERE id = $1    
            `, [id])
            return
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    disallowPostsFromUser: async (id) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE user
                SET "canPublish" = false
                WHERE id = $1    
            `, [id])
            return
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    banUser: async (userid) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE user
                SET "isBanned" = true
                WHERE id = $1    
            `, [userid])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    unbanUser: async (userid) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE user
                SET "isBanned" = false
                WHERE id = $1    
            `, [userid])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    }
}
module.exports = userQueries;