const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Review} = require('../models')

//display trending page
router.get('/', (req,res)=>{
    Review.findAll({
        limit: 20 ,
        order: [['average', 'DESC'],['created_at', 'DESC']],
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
            res.render("trending", {
                title: "Trending",
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