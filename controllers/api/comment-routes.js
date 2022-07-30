const router = require('express').Router();

const { Comment }  = require('../../models');

//Get all users
router.get('/', (req, res) => {
    Comment.findAll({
        attribuges: { exclude: ['password'] }
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;