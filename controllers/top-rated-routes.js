const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Review} = require('../models')

//display trending page
router.get('/', (req,res)=>{
    Review.findAll({
        limit: 20 ,
        order: [['average', 'DESC']],
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
            res.render("top-rated", {
                title: "Top Rated",
                reviews,
                loggedIn: req.session.loggedIn
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });   
});

module.exports = router;