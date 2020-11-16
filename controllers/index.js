const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes');
const trendingRoutes = require('./trending-routes');
const topRatedRoutes = require('./top-rated-routes');
const randomRoutes = require('./random-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/trending', trendingRoutes);
router.use('/top-rated', topRatedRoutes);
router.use('/random', randomRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;