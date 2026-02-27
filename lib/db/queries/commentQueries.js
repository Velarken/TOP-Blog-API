const pool = require('../pool.js');

const commentQueries = {
    getCommentsForPost: async (id) => {
        const client = await pool.connect();
        try {
            const commentData = await client.query(`SELECT * FROM comment WHERE postid = $1`, [id]);
            return commentData.rows
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    createNewComment: async (comment, commentAuthor, postId) => {
        const client = await pool.connect()
        try {
            await client.query(`
            INSERT INTO comment (comment, authorid, postid)
                VALUES ($1,$2,$3)
        `, [comment, commentAuthor, postId])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    updateCommentContent: async(commentId, content) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE comment
                SET content = $1
                WHERE id = $2    
            `, [content, commentId])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    deleteComment: async(commentId) => {
        const client = await pool.connect();
        try {
            await client.query(`
                DELETE FROM comment
                WHERE id = $1
            `, [commentId])
            return
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    searchCommentsForKeyword: async (postid, keyword) => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT * FROM comment
                WHERE postid = $1 AND content LIKE '%' || $2 || '%'
            `)
            const postData = data.rows;
            return postData
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    }
}
module.exports = commentQueries;