const postQueries = require('../../lib/db/queries/postQueries.js');
const commentQueries = require('../../lib/db/queries/commentQueries.js');

async function getAllPosts( req, res ) {
    const postData = await postQueries.getAllPosts();
    // attach comments to post
    for (let i = 0; i < postData.length; i++) {
        let comments = await commentQueries.getCommentsForPost(postData[i].post_id)
        postData[i]['comments'] = comments
    }
    res.json(postData)
}
async function getAllPublishedPosts( req, res ) {
    const postData = await postQueries.getAllPublishedPosts();
    // attach comments to post
    for (let i = 0; i < postData.length; i++) {
        let comments = await commentQueries.getCommentsForPost(postData[i].post_id)
        postData[i]['comments'] = comments
    }
    res.json(postData)
}
async function getPostViaId( req, res ) {
    const { postid } = req.body;
    const postData = await postQueries.getSinglePostById(postid);
    res.json(postData)
}
async function allPostsByUser( req, res ) {
    const { authorid } = req.body;
    const postData = await postQueries.getAllPostsFromAuthor(authorid);
    // attach comments to posts
    for (let i = 0; i < postData.length; i++) {
        let comments = await commentQueries.getCommentsForPost(postData[i].post_id)
        postData[i]['comments'] = comments
    }
    res.json(postData)
}
async function searchPostsViaKeyword( req, res ) { 
    const { keyword } = req.body;
    const postData = await postQueries.searchForKeywordInPost(keyword)
    res.json(postData)
}
async function searchPostTitlesViaKeyword( req, res ) {
    const { keyword } = req.body;
    const postData = await postQueries.searchForKeywordInPostTitle(keyword)
    res.json(postData)
}
async function searchByCategory( req, res ) {
    const { category } = req.body;
    const postData = await postQueries.searchForPostsWithCategory(category);
    res.json(postData)
}
async function createPost( req, res ) {
    const {title, content, authorid} = req.body
    await postQueries.createNewPost(title, content, authorid)
    return
}
async function deletePost( req, res ) {
    const { postid } = req.body
    await postQueries.deletePost(postid)
    return
}
async function updatePostContent( req, res ) {
    const { postid, content } = req.body;
    await postQueries.updatePostContent(postid, content);
    return
}
async function updatePostTitle( req, res ) {
    const { postid, title } = req.body;
    await postQueries.updatePostTitle(postid, title);
    return
}
async function publishPost( req, res ) {
    const { postid } = req.body;
    await postQueries.publishPost(postid)
    return
}
async function unpublishPost( req, res ) {
    const { postid } = req.body;
    await postQueries.unpublishPost(postid)
    return
}
async function getAllUnpublishedPosts( req, res ) {
    const data = await postQueries.getAllUnpublishedPosts
    return data
}
async function getUnpublishedPostsFromUser( req, res ) {
    const { authorid } = req.body;
    const data = await postQueries.getUnpublishedPostsFromUser(authorid)
    return data
}

module.exports = {
    getAllPosts,
    getAllPublishedPosts,
    getPostViaId,
    createPost,
    deletePost,
    publishPost,
    unpublishPost,
    getAllUnpublishedPosts,
    getUnpublishedPostsFromUser,
    updatePostContent,
    updatePostTitle,
    allPostsByUser,
    searchPostsViaKeyword,
    searchPostTitlesViaKeyword,
    searchByCategory
}