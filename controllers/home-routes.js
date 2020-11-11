const router = require('express').Router();
//const { rmdirSync } = require('fs');
const sequelize = require('../config/connection');
const { User, Rating, Review, Comment, Provider} = require('../models');

router.get('/', (req,res)=>{
    Review.findAll({
        order: [['created_at', 'DESC']],
        attributes: [
            'title',
            'text',
            [sequelize.literal('(SELECT COUNT(*) FROM comment c JOIN review r on c.review_id = r.id)'), 'comments'],
            [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id)'), 'upvotes']
        ],
        include: {
            model: Provider,
            attributes: ['name']
        }
        
    })
    .then(dbReviewData=>{
        const reviews = dbReviewData.map(review=>review.get({plain:true}));
        console.log(reviews);
    res.render("index", { 
        title: "Home",
        reviews
     })
    })
     .catch(err=>{
         console.log(err);
         res.status(500).json(err);
     });
});

router.get('/login', (req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
});


module.exports = router;