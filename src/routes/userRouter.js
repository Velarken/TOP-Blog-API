const { Router } = require('express');
const { user } = require('../../lib/prisma');

const userRouter = Router();

userRouter.get('/', ( req, res ) => {
    res.json({
        message: 'Routes for account login and signup'
    });
});
userRouter.get('/login', ( req, res ) => {
    res.json({
        username: 'Type username',
        password: 'Type password',
        button: 'Login'
    });
});
userRouter.post('/login', ( req, res ) => {
    res.json({
        success: 'User is logged in.',
        failure: 'Username or Password do not match records.'
    });
});
userRouter.get('/signup', ( req, res ) => {
    res.json({
        username: 'Please type in desired username.',
        firstName: 'Please type your first name.',
        lastName: 'Please type your last name.',
        email: 'Please type your preferred email address.',
        password: 'Create a unique password that is between 12 and 32 characters.',
        confirmPassword: 'Please type the same password again.',
        button: 'Sign up'
    });
});
userRouter.post('/signup', ( req, res ) => {
    res.json({
        success: 'User account created successfully. Redirecting to login page.',
        failure: 'There was an issue creating your account, please try again.'
    })
})

module.exports = userRouter;