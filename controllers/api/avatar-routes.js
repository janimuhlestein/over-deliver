const router = require('express').Router();
const {User, Avatar} = require('../../models');

router.get('/', (req,res)=>{
    Avatar.findAll()
    .then(dbAvatarData=>{
        res.json(dbAvatarData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    Avatar.findOne({
        where:{
            id: req.params.id
        },
        attributes: ['id', 'file', 'path'],
        include: {
            model: User,
            attributes: ['user_id']
        }
    })
    .then(dbAvatarData=>{
        if(!dbAvatarData) {
            res.status(404).json({message: 'No avatar found with that id'});
            return;
        }
        res.json(dbAvatarData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    Avatar.create({
        user_id: req.body.user_id,
        file: req.body.file,
        path: req.body.path
    })
    .then(dbAvatarData=>{
        res.json(dbAvatarData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req,res)=>{
    Avatar.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbAvatarData=>{
        if(!dbAvatarData) {
            res.status(404).json({message: 'No avatar found with that id'});
            return;
        }
        res.json(dbAvatarData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req,res)=>{
    Avatar.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbAvatarData=>{
        if(!dbAvatarData) {
            res.status(404).json({message: 'No avatar found with that id'});
            return;
        }
        res.json(dbAvatarData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;