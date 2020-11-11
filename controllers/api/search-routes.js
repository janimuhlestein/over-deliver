const router = require('express').Router();
const {Op} = require('sequelize');
const {Comment, Rating, Review, Provider, Image} = require('../../models');

//get reviews with specific provider
router.get('/provider/reviews', (req,res)=>{
    var query = req.url.split('?');
    Provider.findOne({
        where: {
            name: {
                [Op.substring]: query[1]
            }
        },
        attributes: ['id', 'name', 'type'],
        include: {
           model: Rating,
           attributes: ['id', 'average', 'quality', 'value', 'speed', 'safety', 'accuracy'],
           include: {
               model: Review,
              attributes: ['id', 'title','text'],
              include: {
                  model: Comment,
                  attributes: ['text']
              }
           }
       }

    })
    .then(dbProviderData=>{
        if(!dbProviderData) {
           res.status(404).json({message: 'No provider found with that name'});
           return;
        }
        res.json(dbProviderData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//get the images for a provider
/* router.get('/provider/images', (req,res)=>{
    var query = req.url.split('?');
  Provider.findAll({
      where: {
          name: {
          [Op.substring]: query[1]
          }
      },
       include: {
          model: Review,
          attributes: ['id'],
          include: {
              model: Image,
              attributes: ['file', 'path']
          }
      } 
  }) 
  .then(dbProviderData=>{
      if(!dbProviderData){
          res.status(404).json({message: 'no provider found with that name.'});
          return;
      }
      res.json(dbProviderData);
  })
  .catch(err=>{
      console.log(err);
      res.status(500).json(err);
  });
}); */

//get most recent reviews (everything from two weeks)

var subtractDays = (days)=>{
    var currentDate = new Date();
    return currentDate.setTime(currentDate.getTime() - (days*24*60*60*1000));
};

router.get('/reviews/recent', (req,res)=>{
    Review.findAll({
        where: {
            created_at: 
            {[Op.gte]: subtractDays(14)}
        },
        order: [['created_at', 'DESC']]
    })
    .then(dbReviewData=>{
        res.json(dbReviewData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//get most recent reviews for a provider (last two weeks)
router.get('/provider/recent', (req,res)=>{
    var query = req.url.split('?');
    Provider.findAll({
        where: {
            name: {
                [Op.substring]: query[1]
            },
            order: [['created_at', 'DESC']]
        },
        include: {
            model: Review,
            where: {
                created_at: {
                [Op.gte]: subtractDays(14)
                }
            }
        }
    })
    .then(dbProviderData=>{
        if(!dbProviderData) {
            res.status(404).json({message: 'No reviews for that provider in the past two weeks.'});
            return;
        }
        res.json(dbProviderData);
    })
    .catch(err=>{
        console.log(err);
        res.json(err);
    });
});

//search for all of a specific average rating
router.get('/ratings',(req,res)=>{
    var query = req.url.split('?');
    Rating.findAll({
        where: {
            average: {
                [Op.lte]: query[1]
            }
        },
        order: [['created_at', 'DESC']],
        include: {
                model: Review,
                attributes: ['title', 'text'],
                include: {
                    model: Provider,
                    attributes: ['name']
                }
        }
    })
    .then(dbRatingData=>{
        if(!dbRatingData) {
            res.status(404).json({message: 'No ratings found with that average'});
            return;
        }
        res.json(dbRatingData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

//search by specific rating: quality
router.get('/quality', (req,res)=>{
    var query = req.url.split('?');
   // console.log(option);
    Rating.findAll({
        where:{
            quality: {
                [Op.eq]: query[1]
            }
        },
        order: [['created_at', 'DESC']],
        include:[ {
            model: Review,
            attributes: [
                'title',
                'text'
            ],
            include:[ {
                model: Comment,
                attributes: ['text']
            },
            {
                model: Provider,
                attributes: ['name']
            }
        ]
        }
    ]
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: value
router.get('/value', (req,res)=>{
    var query = req.url.split('?');
    console.log(option);
    Rating.findAll({
        where:{
            value: {
                [Op.eq]: query[1]
            }
        },
        order: [['created_at', 'DESC']],
        include:[ {
            model: Review,
            attributes: [
                'title',
                'text'
            ],
            include:[ {
                model: Comment,
                attributes: ['text']
            },
            {
                model: Provider,
                attributes: ['name']
            }
        ]
        }
    ]
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: accuracy
router.get('/accuracy', (req,res)=>{
    var query = req.url.split('?');
    console.log(option);
    Rating.findAll({
        where:{
            accuracy: {
                [Op.eq]: query[1]
            }
        },
        order: [['created_at', 'DESC']],
        include:[ {
            model: Review,
            attributes: [
                'title',
                'text'
            ],
            include:[ {
                model: Comment,
                attributes: ['text']
            },
            {
                model: Provider,
                attributes: ['name']
            }
        ]
        }
    ]
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: packaging
router.get('/packaging', (req,res)=>{
    var query = req.url.split('?');
    Rating.findAll({
        where:{
            packaging: {
                [Op.eq]: query[1]
            }
        },
        order: [['created_at', 'DESC']],
        include:[ {
            model: Review,
            attributes: [
                'title',
                'text'
            ],
            include:[ {
                model: Comment,
                attributes: ['text']
            },
            {
                model: Provider,
                attributes: ['name']
            }
        ]
        }
    ]
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});

//search by specific rating: speed
router.get('/speed', (req,res)=>{
    var query = req.url.split('?');
    Rating.findAll({
        where:{
            speed: {
                [Op.eq]: query[1]
            }
        },
        order: [['created_at', 'DESC']],
        include:[ {
            model: Review,
            attributes: [
                'title',
                'text'
            ],
            include:[ {
                model: Comment,
                attributes: ['text']
            },
            {
                model: Provider,
                attributes: ['name']
            }
        ]
        }
    ]
    })
    .then(dbSearchData=>{
        if(!dbSearchData) {
            res.status(404).json({messsage: 'No ratings found that match that criteria'});
            return;
        }
        res.json(dbSearchData);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json(err);
});
});
 


module.exports = router;