const userQueries = require('../../lib/db/queries/userQueries.js');
const jwt = require('../../lib/jwt.js')
const bcrypt = require('bcrypt');
require('dotenv').config();

async function getUserInfo( req, res ) {
    const { userid } = req.body;
    return await userQueries.findUser(userid);
}
async function signUpUser( req, res ) {
    const { username, firstname, lastname, email, password } = req.body;
    await userQueries.createNewUser(username, firstname, lastname, email, password)
    return
}
async function loginUser( req, res, next ) {
    const { username, password } = req.body;

    const userData = await userQueries.logInUser(username);
    if (userData == []) {
        res.statusCode(400).json({ message: 'Username is incorrect' })
        return
    }
    console.table(userData[0].password)
    const comparePassword = await bcrypt.compare(password, userData[0].password)
    if (!comparePassword) {
        res.statusCode(400).json({ message: 'Password is incorrect!' })
        return
    }
    // create new JWT for user
    const tokenData = { id: userData.id, username: userData.username, firstName: userData.firstName }
    const userToken = jwt.createToken(tokenData, process.env.ACCESS_TOKEN_SECRET, {exipresIn: '1h'});
    const cookieData = JSON.stringify({token: userToken}, {expiresIn: 60*60*1000, httpOnly: true})
    
    res.cookie('JWT', cookieData);
    res.status(200).json({message: 'Cookie set successfully'})
    return
    // add db session store to this call
}
async function deleteUser( req, res ) { // self or admin use
    const { userid } = req.body;
    // include some kind of confirmation
    await userQueries.deleteUser(userid, username)
    return
}
async function updateUserAlias( req, res ) {
    const { userid, username } = req.body
    await userQueries.updateUserAlias(userid, username)
    return
}
async function updateUserName( req, res ) {
    const { userid, firstname, lastname } = req.body;
    await userQueries.updateUserName(userid,firstname,lastname)
    return
}
async function updateUserPassword( req, res ) {
    const { userid, password } = req.body
    await userQueries.updateUserPassword(userid,password)
    return
}
// admin only
async function makeAdmin( req, res ) {
    const { userid } = req.body
    await userQueries.makeAdmin(userid)
    await userQueries.allowPostsFromUser(userid)
    return
}
async function removeAdmin( req, res ) {
    const { userid } = req.body;
    await userQueries.removeAdmin(userid)
    await userQueries.disallowPostsFromUser(userid)
    return
}
async function allowPostsFromUser( req, res ) {
    const { userid } = req.body
    await userQueries.allowPostsFromUser(userid)
    return
}
async function disallowPostsFromUser( req, res ) {
    const { userid } = req.body
    await userQueries.disallowPostsFromUser(userid)
    return
}
async function banUser( req, res ) {
    const { userid } = req.body;
    await userQueries.banUser(userid);
    await userQueries.disallowPostsFromUser(userid);
    return
}
async function unbanUser( req, res ) {
    const { userid } = req.body;
    await userQueries.unbanUser(userid);
    await userQueries.allowPostsFromUser(userid);
    return
}


module.exports = {
    getUserInfo,
    signUpUser,
    loginUser,
    deleteUser,
    updateUserAlias,
    updateUserName,
    updateUserPassword,
    makeAdmin,
    removeAdmin,
    allowPostsFromUser,
    disallowPostsFromUser,
    banUser,
    unbanUser
}