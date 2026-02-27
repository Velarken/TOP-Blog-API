const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const { getUserByUsername, getUserById } = require('./db/queries/postQueries.js');

async function verifyUser(username, password, done) {
    try {
        const user = await getUserByUsername(username)
        if (!user) {
            return done(null, false, { message: 'Username not found.' });
        };
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return done(null, false, { message: 'Password is incorrect.' });
        };
        return done(null, user);
    } catch (error) {
        return done(error);
    }
};
async function initPassport() {
    passport.use(new LocalStrategy(verifyUser));
    // serialize
    passport.serializeUser((user, done) => {
        done(null, user.id)
    });
    // deserialize
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await getUserById(id)
        } catch (error) {
            done(error)
        }
    })
    return passport;
}

module.exports = initPassport;