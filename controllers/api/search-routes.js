const router = require('express').Router();
const {Op, Sequelize} = require('sequelize');
const sequelize = require('../../config/connection');
const {Comment, Review} = require('../../models');

//get reviews with specific service
router.get('/reviews/:service', (req,res)=>{
    Review.findOne({
        where: {
            service: req.params.service
        },
        attributes: [
        'id', 
        'title',
        'text',
        'service', 
        'average', 
        'quality', 
        'value', 
        'speed', 
        'safety', 
        'accuracy',
        [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id)'), 'upVotes']
    ],
        include: {
             model: Comment,
             attributes: ['text']
       }

    })
    .then(dbServiceData=>{
        if(!dbServiceData) {
           res.status(404).json({message: 'No service found with that name'});
           return;
        }
        res.json(dbServiceData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});


//get most recent reviews (everything from two weeks)

var subtractDays = (days)=>{
    var currentDate = new Date();
    return currentDate.setTime(currentDate.getTime() - (days*24*60*60*1000));
};

router.get('/recent', (req,res)=>{
    Review.findAll({
       where: {
            created_at:  {
                [Op.gte]: subtractDays(14)
            }
        }, 
        attributes: [
            'id', 
            'title',
            'text',
            'service', 
            'average', 
            'quality', 
            'value', 
            'speed', 
            'safety', 
            'accuracy',
            [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id)'), 'upVotes']
    ],
        include: {
            model: Comment,
            attributes: ['text']
        },
        order: [['created_at', 'DESC']]
    })
    .then(dbReviewData=>{
        res.json(dbReviewData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//get most recent reviews for a service (last two weeks)
router.get('/service/recent/:service', (req,res)=>{
    Review.findAll({
        where: {
            service: req.params.service,
            created_at: {
                [Op.gte]: subtractDays(14)
            }
        },
            attributes: [
                'id', 
                'title',
                'text', 
                'service',  
                'average', 
                'quality', 
                'value', 
                'speed', 
                'safety', 
                'accuracy',
                [sequelize.literal('(SELECT COUNT(*) FROM vote v JOIN review r on v.review_id = r.id)'), 'upVotes']
            ],
            include: {
                model: Comment,
                attributes: ['text']
            },
            order: [['created_at', 'DESC']]
    })
    .then(dbServiceData=>{
        if(!dbServiceData) {
            res.status(404).json({message: 'No reviews for that service in the past two weeks.'});
            return;
        }
        res.json(dbServiceData);
    })
    .catch(err=>{
        console.log(err);
        res.json(err);
    });
});

//search for all of a specific average rating
router.get('/average/:average',(req,res)=>{
    Review.findAll({
        where: {
            average: req.params.average
        },
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']]
    })
    .then(dbRatingData=>{
        if(!dbRatingData) {
            res.status(404).json({message: 'No ratings found with that average'});
            return;
        }
        res.json(dbRatingData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//search by specific rating: quality
router.get('/quality/:quality', (req,res)=>{
    Review.findAll({
        where:{
            quality: req.params.quality
        },
        attributes: ['id', 'service', 'average','quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']]
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: value
router.get('/value/:value', (req,res)=>{
    Review.findAll({
        where:{
            value: req.params.value
        },
        attributes: ['id','service', 'average','quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: accuracy
router.get('/accuracy/:accuracy', (req,res)=>{
    Review.findAll({
        where:{
            accuracy: req.params.accuracy
        },
        attributes: ['id', 'service', 'average', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: packaging
router.get('/safety/:safety', (req,res)=>{
    Review.findAll({
        where: {
            safety: req.params.safety
        },
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: speed
router.get('/speed/:speed', (req,res)=>{
    Review.findAll({
        where:{
            speed: req.params.speed
        },
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

router.get('/average/:average',(req,res)=>{
    Review.findAll({
        where: {
            average: req.params.average
        },
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']]
    })
    .then(dbRatingData=>{
        if(!dbRatingData) {
            res.status(404).json({message: 'No ratings found with that average'});
            return;
        }
        res.json(dbRatingData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//search by specific rating: quality
router.get('/quality/:quality', (req,res)=>{
    Review.findAll({
        where:{
            quality: req.params.quality
        },
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']]
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: value
router.get('/value/:value', (req,res)=>{
    Review.findAll({
        where:{
            value: req.params.value
        },
        attributes: ['id','service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: accuracy
router.get('/accuracy/:accuracy', (req,res)=>{
    Review.findAll({
        where:{
            accuracy: req.params.accuracy
        },
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['created_at', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific category
router.get('/average', (req,res)=>{
    Review.findAll({
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['average', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found for that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

router.get('/quality', (req,res)=>{
    Review.findAll({
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['quality', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found for that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

router.get('/value', (req,res)=>{
    Review.findAll({
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['value', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found for that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

router.get('/speed', (req,res)=>{
    Review.findAll({
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['speed', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found for that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

router.get('/safety', (req,res)=>{
    Review.findAll({
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['safety', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found for that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

router.get('/accuracy', (req,res)=>{
    Review.findAll({
        attributes: ['id', 'service', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
        order: [['accuracy', 'DESC']],
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found for that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});
 
module.exports = router;