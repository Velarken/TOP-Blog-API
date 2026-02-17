const { Router } = require('express');
const postQueries = require('../../lib/db/queries/postQueries.js')

const postRouter = Router();

postRouter.get('/', postQueries.getAllPosts);
postRouter.get('/search', ( req, res ) => {
    res.json({
        message: 'Show search form with the following fields',
        fields: {
            user: 'Search for all posts by a given user.',
            keyword: 'Search for all posts with a given keyword.',
            category: 'Search for all posts within a given category.'
        }
    })
})
postRouter.get('/search/:userId', ( req, res ) => {
    // logic to find posts that were created by given userId
    res.json({
        message: 'Showing all posts for provided userId.'
    });
});
postRouter.get('/:postId/comments', ( req, res ) => {
    res.json({
        message: 'Showing all comments on a single post with provided postId'
    })
})

module.exports = postRouter;