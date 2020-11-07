const router = require('express').Router();
const userRoutes = require('./user-routes');
const reviewRoutes = require('./review-routes');
const providerRoutes = require('./provider-routes');
const ratingRoutes = require('./rating-routes');


router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/providers', providerRoutes);
router.use('/ratings', ratingRoutes);

module.exports = router;