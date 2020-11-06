const router = require('express').Router();
const {User, Review} = require('../../models');

router.get('/', (req,res)=>{
    Review.findAll({
        attributes: ['id', 'title', 'review_text', 'created_at'],
        include: [{
            model: User,
            attributes: ['username']
        }]
    })
    .then(dbReviewData=>{
        res.json(dbReviewData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    Review.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbReviewData=>{
        if(!dbResData){
            res.status(404).json({message: 'No review found with this id'});
            return
        }
        res.json(dbReviewData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    //expects a provider, user and, for test purposes, a title and text, 
    Review.create({
        title: req.body.title,
        review_text: req.body.review_text,
        user_id: req.body.user_id,
        provider_id: req.body.provider_id
    })
    .then(dbReviewData=>{
        res.json(dbReviewData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;