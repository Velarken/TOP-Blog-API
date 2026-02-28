const jwt = require('jsonwebtoken');
require('dotenv').config();

const jsonwebtoken = {
    createToken: ( userData ) => {
        const user = { user: userData }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const accessToken = jwt.sign(user, secret)
        return { accessToken: accessToken }
    },
    authenticateToken: ( req, res, next ) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
            if (error) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
}

module.exports = jsonwebtoken;