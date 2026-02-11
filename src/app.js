const express = require('express');
const path = require('node:path');
require('dotenv').config();

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

// run server
app.listen(process.env.SERVER_PORT, (err) => {
    if (err) {
        console.error('Error starting server: ', err);
    };
    console.log('Server started. Listening on port: ', process.env.SERVER_PORT);
});