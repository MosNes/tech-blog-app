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
router.get('/:id', (req, res) => {
    console.log('========================');
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'contents',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Create Post
router.post('/', (req, res) => {
    //expects {title: 'This is a title', contents: 'block of text', user_id: 1}
    Post.create({
        title: req.body.title,
        contents: req.body.contents,
        // user_id: req.session.user_id
        user_id: req.body.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        });

//Update Post title or content
router.put('/:id', (req, res) => {
    //expects {title: 'This is a title', contents: 'new block of text'}
    Post.update(
        {
            title: req.body.title,
            contents: req.body.contents
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(400).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


//Delete Post
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;