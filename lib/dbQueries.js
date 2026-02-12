const { prisma } = require('./prisma.js');
const bcrypt = require('bcrypt');

// post queries
async function createNewPost(title, content, author) {
    return await prisma.posts.create({
        data: {
            title,
            content,
            author,
        }
    });
};
async function getAllPosts() {
    return await prisma.posts.findMany();
};
async function getCommentsForPost(postId) {

};
// user queries
async function findSingleUser(userId) {
    
};
async function verifyUsernameUnique(username) {
    return await prisma.user.findUnique({
        where: { username }
    })
}
async function createNewUser(username, email, firstName, lastName, password) {
    // check if user already exists
    const doesUserExist = await verifyUsernameUnique(username);
    if (doesUserExist) {
        console.error('Username already exists, please try another.')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return await prisma.user.create({
        data: {
            username,
            email,
            firstName,
            lastName,
            hashedPassword
        }
    })
};

module.exports = {
    createNewPost,
    getAllPosts,
    getCommentsForPost,
    createNewUser,
}