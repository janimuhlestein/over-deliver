const router = require('express').Router();
const { Review, User, Provider, Rating, Comment, Vote, Image } = require('../../models');


router.get('/', (req, res) => {
    Review.findAll({
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
        'accuracy'
    ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
            {
                model: Vote,
                attributes: ['id', 'type'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
        ]
    })
        .then(dbReviewData => {
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Review.findOne({
        where: {
            id: req.params.id
        },
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
        'accuracy'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'text']
            },
            {
                model: Vote,
                attributes: ['id', 'type'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbReviewData => {
            if (!dbReviewData) {
                res.status(404).json({ message: 'No review found with that id' });
                return;
            }
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    Review.create({
        title: req.body.title,
        text: req.body.text,
        service: req.body.service,
        user_id: req.session.user_id,
        average: req.body.average,
        quality: req.body.quality,
        value: req.body.value,
        speed: req.body.speed,
        safety: req.body.safety,
        accuracy: req.body.accuracy
    })
        .then(dbReviewData => {
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    Review.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbReviewData => {
            if (!dbReviewData) {
                res.status(404).json({ message: 'No review found with that id' });
                return;
            }
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', (req, res) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbReviewData => {
            if (!dbReviewData) {
                res.status(404).json({ message: 'No review found with that id' });
                return;
            }
            res.json(dbReviewData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
