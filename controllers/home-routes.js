const router = require('express').Router();
//const { rmdirSync } = require('fs');
const sequelize = require('../config/connection');
const { User, Review, Comment } = require('../models');

router.get('/', (req, res) => {
    Review.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'title',
            'text',
            'average',
            'quality',
            'service',
            'value',
            'speed',
            'safety',
            'id',
            'accuracy',
            [sequelize.literal('(SELECT COUNT(*) FROM comment c JOIN review r on c.review_id = r.id)'), 'comments'],
            [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id)'), 'upvotes']
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbReviewData => {
            const reviews = dbReviewData.map(review => review.get({ plain: true }));
            console.log(reviews);
            res.render("index", {
                title: "Home",
                reviews,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get("/search", (req, res) => {
    res.render("search", { title: "Search" });

});

router.get('/signup', (req, res) => {
    res.render('signup')
});


module.exports = router;