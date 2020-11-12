const router = require('express').Router();
const { Review, User, Provider, Rating, Comment, Vote, Image } = require('../../models');


router.get('/', (req, res) => {
    Review.findAll({
        attributes: ['title', 'text'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username'],
                include: {
                    model: Rating,
                    attributes: ['id', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy']
                }
            },
            {
                model: Provider,
                attributes: ['name', 'type'],

            },
            {
                model: Vote,
                attributes: ['id', 'type'],
                include: {
                    model: User,
                    attributes: ['id', 'username']
                }
            },
            {
                model: Image,
                attributes: ['file', 'path']
            }
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
        attributes: ['title', 'text'],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Provider,
                attributes: ['name', 'type'],
                include: {
                    model: Rating,
                    attributes: ['id', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy']
                }

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
            },
            {
                model: Image,
                attributes: ['id', 'file']
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
        service: req.body.provider,
        user_id: req.session.user_id
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
