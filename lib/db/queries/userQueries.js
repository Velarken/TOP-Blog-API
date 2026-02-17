const bcrypt = require('bcrypt');
const pool = require('../pool.js');

const userQueries = {
    createNewUser: async () => {
        const client = await pool.connect();
        try {
            
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    verifyPassword: async () => {
        const client = await pool.connect();
        try {
            
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