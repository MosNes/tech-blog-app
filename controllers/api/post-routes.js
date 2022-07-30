const router = require('express').Router();

const { Post }  = require('../../models');

//Get all users
router.get('/', (req, res) => {
    Post.findAll({
        attribuges: { exclude: ['password'] }
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;