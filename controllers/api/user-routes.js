const router = require('express').Router();

const { User, Post, Comment }  = require('../../models');

//Get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get User by ID
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password'] },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'contents', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Create New User
//user POST to add username and password to the user table in the database, then creates a session for the user
//PW is hashed by the User model before being saved to the DB
router.post('/', (req, res) => {
    // expects {username: 'user', password: 'password'}
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => {
            //creates session using the newly created user's info
            req.session.save(() => {
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json(dbUserData);
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Login User
//uses POST to send the PW as part of the request body instead of a plaintext query parameter used by GET
router.post('/login', (req, res) => {

    //expects {user: 'username', password: 'userpassword'}

    User.findOne({
        where: {
            username: req.body.username,
        }
    })
        .then(async dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No user found with that email address!' });
                return;
            }

            //load hash from your password DB
            const validPassword = await dbUserData.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: "Incorrect Password!" });
                return;
            }

            //creates a session
            req.session.save(() => {
                //declare session variables
                req.session.user_id = dbUserData.id;
                req.session.username = dbUserData.username;
                req.session.loggedIn = true;

                res.json({ user: dbUserData, message: 'You are now logged in!' });
            });
        });
});

//Logs out user
router.post('/logout',  (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy( () => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//Update User PW
router.put('/:id',  (req, res) => {
    // expects {username: 'user', password: 'password'}

    //if req.body has exact key/value  pairs to match the model, you can just use 'req.body' instead
    //requires individualHooks: true to activate the beforeUpdate() hook in the User model
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(400).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete User
router.delete('/:id',  (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;