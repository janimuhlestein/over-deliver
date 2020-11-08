const router = require('express').Router();
//const { builtinModules } = require('module');
const {Comment, Review, Provider} = require('../../models');

router.get('/', (req,res)=>{
    Comment.findAll({
        attributes: ['id', 'text'],
        include: {
            model: Review,
            attributes: ['title', 'text'],
            include: {
                model: Provider,
                attributes: ['name']
            }
        } 
    })
    .then(dbCommentData=>{
        res.json(dbCommentData);
    });
});

router.get('/:id', (req,res)=>{
    Comment.findOne({
        where:{
            id: req.params.id
        },
        attributes: ['id', 'text'],
        include: {
            model: Review,
            attributes: ['title', 'text'],
            include: {
                model: Provider,
                attributes: ['name']
            }
        }
    })
    .then(dbCommentData=>{
        if(!dbCommentData) {
            res.status(404).json({message: 'No comment found with that id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    Comment.create({
        review_id: req.body.review_id,
        user_id: req.body.user_id,
        text: req.body.text
    })
    .then(dbCommentData=>{
        res.json(dbCommentData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req,res)=>{
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbCommentData=>{
        if(!dbCommentData) {
            res.status({message: 'No comment found with that id'});
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;