const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Review} = require('../models');
let randomLength = 1;
let randomService = "DoorDash";

//find length
router.get('/', (req,res)=>{
    Review.findAndCountAll()
        .then(dbCountData => {
            randomLength = Math.floor(Math.random() * Math.floor(dbCountData.count) + 1);
            console.log(randomLength)
            return randomLength
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

    Review.findByPk(randomLength)
        .then(dbServiceData => {
            randomService = dbServiceData.service
            console.log(randomService)
            return randomService
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });   
    
    Review.findAll({
        limit: 20 ,
        where: {
            service: randomService
        },
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
            console.log(randomService)
            res.render("random", {
                title: "Random",
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