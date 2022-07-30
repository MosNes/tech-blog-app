const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const commentRoutes = require('./comment-routes');

// use userRoutes endpoints for all /users/ requests
router.use('/users', userRoutes);

//use postRoutes for all /posts/ requests
router.use('/posts', postRoutes);

//use commentRoutes for all /comments/ requests
router.use('/comments', commentRoutes);

module.exports = router;