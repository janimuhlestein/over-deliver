const router = require('express').Router();
//const models = require('../../models');
const userRoutes = require('./user-routes');


router.use('/users', userRoutes);

module.exports = router;