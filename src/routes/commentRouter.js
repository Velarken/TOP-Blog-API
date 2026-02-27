const { Router } = require('express');
const commentController = require('../controllers/commentController.js');

const commentRouter = Router();

commentRouter.get('/:postid/allComments', commentController.getCommentsForPost)
commentRouter.post('/:postid/new-comment', commentController.createNewComment)
commentRouter.post('/:postid/edit-comment', commentController.updateComment)
commentRouter.post('/:postid/delete-comment', commentController.deleteComment)
commentRouter.post('/search/:keyword', commentController.searchPostCommentsForKeyword)

module.exports = commentRouter;