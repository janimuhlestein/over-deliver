const router = require('express').Router();
const {Vote, Review, User} = require('../../models');

router.get('/', (req,res)=>{
    Vote.findAll()
    .then(dbVoteData=>{
        res.json(dbVoteData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    Vote.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id'],
        include: {
            model: Review,
            attributes: ['id']
        },
        include: {
            model: User,
            attributes: ['id']
        }
    })
    .then(dbVoteData=>{
        if(!dbVoteData) {
            res.status(404).json({message: 'No vote found with that id'});
            return;
        }
        res.json(dbVoteData)
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    Vote.create({
        review_id: req.body.review_id,
        user_id: req.body.user_id
    })
    .then(dbVoteData=>{
        res.json(dbVoteData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req,res)=>{
   Vote.update(req.body, {
       where: {
           id: req.params.id
       }
   })
   .then(dbVoteData=>{
       if(!dbVoteData) {
           res.status(404).json({message: 'No vote found with that id'});
           return;
       }
       res.json(dbVoteData);
   })
   .catch(err=>{
       console.log(err);
       res.status(500).json(err);
   });

});

router.delete('/:id', (req,res)=>{
    Vote.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbVoteData=>{
        if(!dbVoteData) {
            res.status(404).json({message: 'No vote found with that id'});
            return;
        }
        res.json(dbVoteData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;