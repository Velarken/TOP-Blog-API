const { Router } = require('express');
const postController = require('../controllers/postController.js')

const postRouter = Router();

postRouter.get('/', postController.getAllPublishedPosts);
postRouter.post('/create', postController.createPost);
postRouter.post('/:postId/delete', postController.deletePost);

// post publishing
postRouter.get('/unpublished-posts', postController.getAllUnpublishedPosts);
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

// admin routes
postRouter.get('/all', postController.getAllPosts)

// todo
    // protect relevant routes with JWT
    // '/search/post-title/:keyword' returns empty brackets
    // change queries to only return published posts
    

module.exports = postRouter;