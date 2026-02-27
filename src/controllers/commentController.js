const commentQueries = require('../../lib/db/queries/commentQueries.js');

async function getCommentsForPost( req, res ) {
    const { postId } = req.body
    const postComments = await commentQueries.getCommentsForPost(postId)
    res.json(postComments)
}
async function createNewComment( req, res ) {
    const { content, authorid, postid } = req.body;
    await commentQueries.createNewComment(content, authorid, postid)
    return
}
async function updateComment( req, res ) {
    const { id, content } = req.body;
    await commentQueries.updateCommentContent(id, content)
    return
}
async function deleteComment( req, res ) {
    const { id } = req.body;
    await commentQueries.deleteComment(id);
    return
}
async function searchPostCommentsForKeyword( req, res ) {
    const { postid, keyword } = req.body;
    await commentQueries.searchCommentsForKeyword(postid, keyword);
    return
}
module.exports = {
    getCommentsForPost,
    createNewComment,
    updateComment,
    deleteComment,
    searchPostCommentsForKeyword
}