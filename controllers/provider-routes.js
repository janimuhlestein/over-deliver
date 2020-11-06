const router = require('express').Router();
const {Provider, Review, Rating, User} = require('../models');

router.get('/', (req,res)=>{
    Provider.findAll({
        attributes: ['id', 'name', 'type'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
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
    Provider.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'name', 'type'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbProviderData=>{
        if(!dbProviderData) {
            res.status(404).json({message: 'No provider found with this id.'});
            return;
        }
        res.json(dbProviderData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (res,req)=>{
    Provider.create({
        name: req.body.title,
        type: req.body.type 
    })
    .then(dbProviderData=>{
        res.json(dbProviderData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});