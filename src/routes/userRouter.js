const { Router } = require('express');
const userController = require('../controllers/userController.js');

const userRouter = Router();

userRouter.get('/', userController.showAccountInfo);
userRouter.post('/login', userController.loginUser);
userRouter.post('/signup',userController.signUpUser);
// user info update routes
userRouter.post('/:userid/update-name', userController.updateUserName);
userRouter.post('/:userid/update-username', userController.updateUserAlias);
userRouter.post('/:userid/update-password', userController.updateUserPassword);
// admin only routes
userRouter.post('/:userid/delete', userController.deleteUser);
userRouter.post('/:userid/make-admin', userController.makeAdmin);
userRouter.post('/:userid/remove-admin', userController.removeAdmin);
userRouter.post('/:userid/allow-posting', userController.allowPostsFromUser);
userRouter.post('/:userid/disallow-posting', userController.disallowPostsFromUser);
userRouter.post('/:userid/ban', userController.banUser);
userRouter.post('/:userid/unban', userController.unbanUser);

module.exports = userRouter;