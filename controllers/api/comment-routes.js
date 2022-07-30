const router = require('express').Router();

const { Comment }  = require('../../models');

//Get all comments
router.get('/', (req, res) => {
    Comment.findAll({
        
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Create New Comment
router.post('/', (req, res) => {
    //expects {comment_text: 'block of text', post_id: number, user_id: number}
    //check session (replace true with if req.session)
    if (true) {

        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            //use id from session
            user_id: req.body.user_id
        })
            .then(dbCommentData => res.json(dbCommentData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

//Delete Comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' })
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

module.exports = router;