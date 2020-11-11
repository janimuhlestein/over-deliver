const router = require('express').Router();
const { rebeccapurple } = require('color-name');
const {Rating, Provider, User, Review,Comment} = require('../../models');

router.get('/',(req,res)=>{
    Rating.findAll({
        order: [['created_at', 'DESC']]
    })
    .then(dbRatingData=>{
        res.json(dbRatingData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    Rating.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'average', 'quality', 'value', 'speed', 'accuracy', 'safety' ],
                include: {
                    model: Review,
                    attributes: ['id', 'title', 'text'],
                    include: {
                            model: Provider,
                            attributes: ['name', 'type']
                    },
                    include: {
                        mdel: User,
                        attributes: ['id', 'username']
                    }
                },
                    include: {
                        model: Comment,
                        attributes: ['id','text'],
                    },
                    include: {
                        model: User,
                        attributes: ['id', 'username']
                    }
                 
    })
    .then(dbRatingData=>{
        if(!dbRatingData) {
            res.status(404).json({message: 'No rating found with that id'});
            return;
        }
        res.json(dbRatingData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    Rating.create({
        user_id: req.body.user_id,
        provider_id: req.body.provider_id,
        average: req.body.average,
        quality: req.body.quality,
        value: req.body.value,
        speed: req.body.speed,
        accuracy: req.body.accuracy,
        safety: req.body.safety
    })
    .then(dbRatingData=>{
        res.json(dbRatingData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req,res)=>{
    Rating.update(
    req.body,  {
        where: {
            id: req.params.id
        }
})
.then(dbRatingData=>{
    if(!dbRatingData) {
        res.status(404).json({message: 'No rating found with that id'});
        return;
    }
    res.json(dbRatingData);
})
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
});
});

router.delete('/:id', (req,res)=>{
    Rating.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbRatingData=>{
        if(!dbRatingData) {
            res.status(404).json({message: 'No rating found with that id'});
            return;
        }
        res.json(dbRatingData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;