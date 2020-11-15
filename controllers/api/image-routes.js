const router = require('express').Router();
const {Image, User, Review} = require('../../models');

router.get('/', (req,res)=>{
    Image.findAll()
    .then(dbImageData=>{
        res.json(dbImageData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    Image.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'file', 'path'],
        include: {
            model: Review,
            attributes: ['id'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
    .then(dbImageData=>{
        if(!dbImageData) {
            res.status(404).json({message: 'No image found with that id'});
            return;
        }
        res.json(dbImageData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    Image.create({
        file: req.body.file,
        path: req.body.path,
        review_id: req.body.review_id,
        user_id: req.body.user_id
    })
    .then(dbImageData=>{
        res.json(dbImageData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req,res)=>{
    console.log(req.params, req.body);
    Image.update(req.body,{
        where:{
            id: req.params.id
        }
    })
    .then(dbImageData=>{
        if(!dbImageData) {
            res.status(404).json({message: 'No image found with that id'});
            return;
        }
        res.json(dbImageData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req,res)=>{
    Image.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbImageDb=>{
        if(!dbImageDb) {
            res.status(404).json({message: 'No image found with that id'});
            return;
        }
        res.json(dbImageData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;