const express = require('express');
const path = require('node:path');
require('dotenv').config();

const postRouter = require('./routes/postRouter.js');
const userRouter = require('./routes/userRouter.js');

const app = express();

// server config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// middlewares

// routes
app.get('/', ( req, res ) => {
    res.json({
        message: 'Homepage'
    });
});
app.use('/posts', postRouter);
app.use('/user', userRouter);

// run server
app.listen(process.env.SERVER_PORT, (err) => {
    if (err) {
        console.error('Error starting server: ', err);
    };
    console.log('Server started. Listening on port: ', process.env.SERVER_PORT);
});