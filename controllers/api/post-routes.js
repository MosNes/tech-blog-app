const router = require('express').Router();

const { Post }  = require('../../models');

//Get all posts
router.get('/', (req, res) => {
    Post.findAll({
        
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get post by ID

//Create Post

//Update Post

//Delete Post

module.exports = router;