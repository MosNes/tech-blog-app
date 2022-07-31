const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const router = require('express').Router();

//default route, loads homepage and all posts from DB
router.get('/', (req, res) => {

    //logs session if active
    console.log(req.session);

    Post.findAll({
        attributes: [
            'id',
            'contents',
            'title',
            'created_at'
        ],
        include: [
            //include comments associated with post
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    //include the user who authored the comment
                    model: User,
                    attributes: ['username']
                }
            },
            //include the user who authored the post
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            //must use .get({ plain: true }) to return a serialized version of the requested object instead of entire sequelize object
            const posts = dbPostData.map(post => post.get({ plain: true }));

            //pass array of formatted post objects into the homepage template
            res.render('homepage', {
                posts,
                //pass login status to homepage template to selectively render elements that require user to be logged in
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//login page route for /login
router.get('/login', (req, res) => {

    //if user is logged in, redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');

});

//signup page route for /signup
router.get('/signup', (req, res) => {

    //if user is logged in, redirect to homepage
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');

});

module.exports = router;