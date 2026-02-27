const { Router } = require('express');
const postController = require('../controllers/postController.js')

const postRouter = Router();

postRouter.get('/', postController.getAllPublishedPosts);
postRouter.post('/create', postController.createPost);
postRouter.post('/:postId/delete', postController.deletePost);

// post publishing
postRouter.post('/unpublished-posts/:authorid', postController.getUnpublishedPostsFromUser);
postRouter.post('/:postid/publish', postController.publishPost);
postRouter.post('/:postid/unpublish', postController.unpublishPost);

// update single post
postRouter.post('/:postid/edit-content', postController.updatePostContent);
postRouter.post('/:postid/edit-title', postController.updatePostTitle);

// search existing posts 
postRouter.post('/search/:postid', postController.getPostViaId);
postRouter.post('/search/users/:userId', postController.allPostsByUser);
postRouter.post('/search/post-content/:keyword', postController.searchPostsViaKeyword);
postRouter.post('/search/post-title/:keyword', postController.searchPostTitlesViaKeyword);
postRouter.post('/search/category/:category', postController.searchByCategory);

// admin only routes
postRouter.get('/all', postController.getAllPosts);
postRouter.get('/unpublished-posts', postController.getAllUnpublishedPosts);

// todo
    // protect relevant routes with JWT
    // '/search/post-title/:keyword' returns empty brackets
    // add comments to fetched post data
    /* 
        for (let i = 0; i > postData.length; i++) {
            // fetch comments for given postid
            // add comments: [] to given postid
            // push comments into new array
        }
    */
    

module.exports = postRouter;