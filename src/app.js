// import installed packages
const express = require('express');
const path = require('node:path');
const passport = require('passport');
require('dotenv').config();

// import local files
const postRouter = require('./routes/postRouter.js');
const userRouter = require('./routes/userRouter.js');
const passportFunctions = require('../lib/passport.js');

const app = express();

// server config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'testingViews'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
passportFunctions.initPassport();
// middlewares
/* initPassport();
app.use(passport.session());
app.use(
  expressSession({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      prisma,
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
); */

app.use(( req, res, next ) => {
    res.locals.currentUser = req.user;
    next();
})
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