const router = require('express').Router();
//const { rmdirSync } = require('fs');
const sequelize = require('../config/connection');
const { User, Rating, Review, Comment, Provider } = require('../models');

router.get('/', (req, res) => {
    Review.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'title',
            'text',
            [sequelize.literal('(SELECT COUNT(*) FROM comment c JOIN review r on c.review_id = r.id)'), 'comments'],
            [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id)'), 'upvotes']
        ],
        include: [{
            model: Provider,
            attributes: ['name']
        },
        {
            model: Rating,
            attributes: ['id', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy']
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
    router.get('/view-post/:id', (req, res) => {
        Review.findOne({
            where: {
                id: req.params.id
            },
            order: [['created_at', 'DESC']],
            attributes: [
                'id',
                'title',
                'text',
                [sequelize.literal('(SELECT COUNT(*) FROM comment c JOIN review r on c.review_id = r.id)'), 'comments'],
                [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id)'), 'upvotes']
            ],
            include: [
                {
                    model: Rating,
                    attributes: ['id', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy']
                },
                {
                    model: Comment,
                    attributes: ['id', 'text', 'review_id', 'user_id'],
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
            .then(dbReviewData => {
                if (!dbReviewData) {
                    res.status(404).json({ message: 'No review found with that id' });
                    return;
                }
                const review = dbReviewData.get({ plain: true })
                res.render('view-post', { review });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    });
});

router.get('/signup', (req, res) => {
    res.render('signup')
        .then(dbSignupData => {
            res.json(dbSignupData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;