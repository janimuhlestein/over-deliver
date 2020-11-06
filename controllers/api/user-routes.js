const router = require('express').Router();
const{User, Review, Vote, Comment, Provider} = require('../../models');

router.get('/', (req,res)=>{
    User.findAll({
        attributes: {exclude: ['password']}
    })
    .then(dbUserData=> {
        res.json(dbUserData);
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req,res)=>{
    User.findOne({
        attributes: {exclude: ['password']},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Review,
                attributes: ['id', 'title', 'review_text', 'provider_name', 'provider_type'],
                include: {
                    model: Provider,
                    attributes: ['name', 'type']
                }
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Review,
                    attributes: ['title'],
                    through: Vote
                }
            }
        ]
    })
    .then(dbUserData=>{
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req,res)=>{
    User.create({
        username: req.body.username,
        email: req.body,email,
        password: req.body.password
    })
    .then(dbUserData=>{
        res.json(dbUserData);
    });
})
.catch(err=>{
    console.log(err);
    res.status(500).json(err);
});

router.put('/:id', (req,res)=>{
    User.update(req.body, {
        individualHooks: true
    })
})