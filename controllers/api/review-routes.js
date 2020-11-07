const router = require('express').Router();
const {Review, User, Provider} = require('../../models');

router.get('/', (req,res)=>{
    Review.findAll()
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
    },
    attributes: ['title', 'text'],
    include: [
        {
        model: User,
        attributes: ['username']
    },
    {
        model: Provider,
        attributes: ['name', 'type']
    }
]
})
.then(dbReviewData=>{
    if(!dbReviewData){
        res.status(404).json({message: 'No review found with that id'});
        return;
    }
    res.json(dbReviewData);
})
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
});
});

router.post('/', (req,res)=>{
    Review.create({
        title: req.body.title,
        text: req.body.text,
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

router.put('/:id', (req, res)=>{
    Review.update(req.body,{
        where: {
            id: req.params.id
        }
    })
    .then(dbReviewData=>{
        if(!dbReviewData) {
            res.status(404).json({message: 'No review found with that id'});
            return;
        }
        res.json(dbReviewData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req,res)=>{
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbReviewData=>{
        if(!dbReviewData) {
            res.status(404).json({message: 'No review found with that id'});
            return;
        }
        res.json(dbReviewData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
