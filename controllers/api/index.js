const router = require('express').Router();
const userRoutes = require('./user-routes');
//const reviewRoutes = require('./review-routes');
const providerRoutes = require('./provider-routes');


router.use('/users', userRoutes);
//router.use('/reviews', reviewRoutes);
router.use('/providers', providerRoutes);

module.exports = router;