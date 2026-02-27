const pool = require('../pool.js'); // for SQL queries
const commentQueries = require('./commentQueries.js')

const postQueries = {
    getAllPosts: async () => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT 
                    u.username AS username,
                    u.id AS user_id,
                    p.id AS post_id,
                    p.*
                FROM users u
                JOIN post p
                    ON u.id = p.authorid
                ORDER BY p.createdat DESC
            `);
            const postData = data.rows
            return postData
        } catch (error) {
            throw error
        } finally {
            client.release()
        }
    },
    getAllPublishedPosts: async () => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT 
                    u.username AS username,
                    u.id AS user_id,
                    p.id AS post_id,
                    p.*
                FROM users u
                JOIN post p
                    ON u.id = p.authorid
                WHERE p."isPublished" = TRUE
                ORDER BY p.createdat DESC
            `);
            const postData = data.rows
            return postData
        } catch (error) {
            throw error
        } finally {
            client.release()
        }
    },
    getSinglePostById: async ( postid ) => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT * FROM post
                WHERE id = $1 AND "isPublished" = TRUE
            `, [postid])
            const postData = data.rows
           
            if ( data.rowCount == 0 ) { // unpublished posts will return 0 data.rows
                return { message: 'post is not published, must be admin or post author to view' }
            } else {
                return postData
            }
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    getAllPostsFromAuthor: async ( authorid ) => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT * FROM post
                WHERE authorid = $1 AND "isPublished" = TRUE
            `, [authorid])
            const postData = data.rows

            if ( data.rowCount == 0 ) { // unpublished posts will return 0 data.rows
                return { message: 'post is not published, must be admin or post author to view' }
            } else {
                return postData
            }
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    publishPost: async (postid) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE post
                SET isPublished = TRUE
                WHERE id = $1    
            `, [postid])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    unpublishPost: async (postid) => {
       const client = await pool.connect();
        try {
            await client.query(`
                UPDATE post
                SET isPublished = FALSE
                WHERE id = $1    
            `, [postid])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    getAllUnpublishedPosts: async () => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT * FROM post
                WHERE isPublished = FALSE    
            `)
            const postData = data.rows;
            return postData
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    getUnpublishedPostsFromUser: async (authorid) => {
                const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT * FROM post
                WHERE isPublished = FALSE AND authorid = $1  
            `, [authorid])
            const postData = data.rows;
            return postData
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    // search posts in db
    searchForKeywordInPost: async (keyword) => {
        const client = await pool.connect();
        try {
            const data =  await client.query(`
                SELECT * FROM post
                WHERE content LIKE '%' || $1 || '%' AND "isPublished" = true 
            `, [keyword])
            const postData = data.rows
            return postData
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    searchForKeywordInPostTitle: async (keyword) => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT * FROM post
                WHERE title LIKE '%' || $1 || '%' AND "isPublished" = true   
            `, [keyword])
            const postData = data.rows
            return postData
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    searchForPostsWithCategory: async (category) => {
        const client = await pool.connect();
        try {
            const data = await client.query(`
                SELECT * FROM post
                WHERE category = $1 AND "isPublished" = true 
            `, [category])
            const postData = data.rows
            return postData
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    // these queries do not return anything
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
    deletePost: async (postid) => {
        const client = await pool.connect();
        console.log(`Post to delete: ${postid}`)
        try {
            await client.query(`
                DELETE FROM post WHERE id = $1
            `, [postid])
            return
        } catch (error) {
            throw error
        }
    },
    updatePostContent: async (postid, content) => {
        const client = await pool.connect();
        try {
            await client.query(`
                UPDATE post
                SET content = $1
                WHERE id = $2
            `, [content, postid])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    },
    updatePostTitle: async (postid, title) => {
        const client = await pool.connect();
        try {
            console.log('updating db entry - post.title')
            await client.query(`
                UPDATE post
                SET title = $1
                WHERE id = $2    
            `, [title, postid])
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    }
}

module.exports = postQueries;