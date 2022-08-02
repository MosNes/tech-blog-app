const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require("../models");

//get all of the user's posts and render dashboard
router.get("/", withAuth, (req, res) => {
    Post.findAll({
      where: {
        //use the ID from the current session
        user_id: req.session.user_id,
      },
      attributes: [
        "id",
        "contents",
        "title",
        "created_at",
      ],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
    .then((dbPostData) => {
      //serialize the data before passing it to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", {posts, loggedIn: true });
    })
    .catch(err  => {
      console.log(err);
      res.status(500).json(err);
    });
  });

module.exports = router;
