const router = require('express').Router();
const sequelize = require('../config/connection');

//display search page
router.get('/', (req,res)=>{
    res.render('search', {title: 'Search'}).catch(err=>{
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
