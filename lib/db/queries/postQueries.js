const pool = require('../pool.js'); // for SQL queries

const postQueries = {
    getAllPosts: async (req, res, next) => {
        const client = await pool.connect();

        try {
            const data = await client.query(`
                SELECT 
                    u.username AS author_username,
                    u.id AS user_id,
                    p.id AS post_id,
                    p.authorid AS post_author,
                    p.title,
                    p.content,
                    p.createdat,
                    p.updatedat
                FROM users u
                JOIN post p
                    ON u.id = p.authorid
                ORDER BY p.createdat DESC
            `);
            const postData = data.rows

            for (let i = 0; i < postData.length; i++) {
                let comments = await postQueries.getCommentsForPost(postData[i].post_id)
                postData[i]['comments'] = comments
            }
            res.json(postData)
        } catch (error) {
            throw error
        } finally {
            client.release()
        }
    },
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
    createNewPost: async ( postTitle, postContent, postAuthor ) => {
        const client = await pool.connect()

        try {
            await client.query(`
            INSERT INTO post (title, content, authorid)
                VALUES ($1,$2,$3)
        `, [postTitle, postContent, postAuthor])
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
    }
}

module.exports = postQueries;