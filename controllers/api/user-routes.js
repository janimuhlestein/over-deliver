const router = require('express').Router();
const { User, Review, Comment } = require('../../models');
const Vote = require('../../models/Vote');
const sequelize=require('../../config/connection');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

    router.get('/:id', (req, res) => {
        User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.session.user_id
        },
        include: [
            {
                model: Review,
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
                    'accuracy']
                },
                {
                model: Comment,
                attributes: ['id', 'text', 'created_at'],
                include: {
                    model: Review,
                    attributes: ['title', 'text']
                }
                },
                {
                model: Vote,
                attributes: ['id'],
                include: {
                    model: Review,
                    attributes: ['id']
                }
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => {
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with that id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        });
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username:req.body.username
        }
    })
    .then(dbUserData=>{
        if(!dbUserData) {
            res.status(400).json({message: 'No user with that username found!'});
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

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end()
    }

});

module.exports = router;
