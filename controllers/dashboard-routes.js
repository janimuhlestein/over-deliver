const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { User, Review, Comment, Vote } = require('../models');
//const { resourceLimits } = require('worker_threads');

//get all of their reviews, plus numbers of comments and votes
router.get('/', withAuth, (req, res) => {
    var voteCount;
    var commentCount;
    var reviewCount;
    Comment.count({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(count => {
            commentCount = count;
        });

    Vote.count({
        where: {
            user_id: req.session.user_id
        },
    })
        .then(count => {
            voteCount = count;
        });

    Review.count({
        where: {
            user_id: req.session.user_id
        }
    })
        .then(count => {
            reviewCount = count;
        })

    Review.findAll({
        where: {
            user_id: req.session.user_id
        },
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
            [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id)'), 'upVotes']
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
            console.log(voteCount, reviewCount, commentCount);
            console.log(dbReviewData);
            res.render("dashboard", {
                title: "Dashboard",
                reviews,
                voteCount,
                commentCount,
                reviewCount,
                user: req.session.username,
                loggedIn: req.session.loggedIn
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
        attributes: [
            'id',
            'title',
            'text',
            'average',
            'quality',
            'value',
            'speed',
            'safety',
            'accuracy'
        ],
        include: [
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

router.get('/view/:id', withAuth, (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'text',
            'average',
            'quality',
            'value',
            'speed',
            'safety',
            'accuracy'
        ],
        include: [
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
            res.render('full-post', { review, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;