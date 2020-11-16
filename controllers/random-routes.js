const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Review, Comment } = require('../models');


//find length
router.get('/', (req, res) => {
    Review.findAll({
        limit: 1,
        order: Sequelize.literal('rand()'),
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
            [sequelize.literal('(SELECT COUNT(*) FROM comment where review.id = comment.review_id)'), 'comments'],
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE review.id = vote.review_id)'), 'upVotes']
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
            res.render("random", {
                title: "Random",
                reviews,
                // review,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/view/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'service',
            'title',
            'text',
            'average',
            'quality',
            'value',
            'speed',
            'safety',
            'accuracy'
        ],
        include: {
            model: Comment,
            attributes: ['text']
        }
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