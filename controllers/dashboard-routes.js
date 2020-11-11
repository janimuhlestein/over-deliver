const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { User, Review, Comment, Vote, Rating, Provider } = require('../models');
const { resourceLimits } = require('worker_threads');

//get all of their reviews, plus numbers of comments and votes
router.get('/', withAuth, (req, res) => {
    Review.findAll({
        where: {
            user_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
        attributes: [
            'title',
            'text',
            // [sequelize.literal('(SELECT COUNT(*) FROM comment c JOIN review r on c.review_id = r.id)'), 'comments'],
            // [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id WHERE v.type = 1)'), 'upVotes']
        ],
        include: [
            {
                model: Rating,
                attributes: ['average', 'quality', 'value', 'speed', 'accuracy', 'safety']
            },
            {
                model: Provider,
                attributes: ['name']
            }
        ]
    })
        .then(dbReviewData => {
            console.log(dbReviewData);
            const reviews = dbReviewData.map(review => review.get({ plain: true }));
            console.log(reviews);
            res.render("dashboard", {
                title: "Dashboard",
                reviews,
                loggedIn: true
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'text',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)'), 'upVote_count']],
        include: [
            {
                model: Provider,
                attributes: ['name']
            },
            {
                model: Comment,
                attributes: ['text']
            }
        ]
    })
        .then(dbReviewData => {
            if (!dbReviewData) {
                res.status(404).json({ message: 'No review found with this id' });
                return;
            }
            const review = dbReviewData.get({ plain: true });
            console.log(review);
            res.render('edit', { review, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;