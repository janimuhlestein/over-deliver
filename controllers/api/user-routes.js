const router = require('express').Router();
const{User, Review, Provider, Rating, Comment, Avatar} = require('../../models');
const Vote = require('../../models/Vote');

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
                attributes: ['id', 'title', 'text', 'provider_id'],
                include: {
                    model: Provider,
                    attributes: ['name', 'type'],
                    include: {
                        model: Rating,
                        attributes: ['id', 'average', 'quality', 'value', 'speed', 'packaging', 'accuracy']
                    }
                }
            },
             {
                model: Comment,
                attributes: ['id', 'text', 'created_at'],
                include: {
                    model: Review,
                    attributes: ['title']
                }
            },
            {
                model: Vote,
                attributes: ['id', 'type'],
                include: {
                    model: Review,
                    attributes: ['id']
                }
            },
            {
                model: Avatar,
                attributes: ['id', 'file', 'path']
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
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData=>{
        res.json(dbUserData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', (req,res)=>{
    User.update(req.body, {
        individualHooks: true,
    where: {
        id: req.params.id
    }
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

router.delete('/:id', (req,res)=>{
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData=>{
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with that id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err=>{
        console.log(err);
        res.json(err);
    });
});

router.post('/login', (req,res)=>{
    User.findOne({
        where: {
            email:req.body.email
        }
    })
    .then(dbUserData=>{
        if(!dbUserData) {
            res.status(400).json({message: 'No user with that email address found!'});
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({ message: 'Incorrect password!'});
        }
        req.session.save(()=>{
            //declare session variables
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.loggedIn = true;
        
        res.json({user: dbUserData, message: 'You are now logged in!'});
        });
    });
});

router.post('/logout', (req,res)=> {
    if(req.session.loggedIn) {
        req.session.destroy(()=>{
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }

});

module.exports = router;