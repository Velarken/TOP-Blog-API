const { Router } = require('express');
const commentQueries = require('../../lib/db/queries/commentQueries.js')

const commentRouter = Router();

commentRouter.get('/:postid/allComments', async ( req, res ) => {
    // get post id from request body
    const { postId } = req.body
    const postComments = await commentQueries.getCommentsForPost(postId)
    res.json(postComments)
})
commentRouter.post('/:postid/new-comment', ( req, res ) => {
    
})
commentRouter.post('/:postid/edit-comment', ( req, res ) => {
    
})

module.exports = commentRouter;