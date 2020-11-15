const router = require('express').Router();
const userRoutes = require('./user-routes');
const reviewRoutes = require('./review-routes');
const commentRoutes = require('./comment-routes');
const voteRoutes = require('./vote-routes');
//const avatarRoutes = require('./avatar-routes');
//const imageRoutes = require('./image-routes');
const searchRoutes = require('./search-routes');


router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/comments', commentRoutes);
router.use('/votes', voteRoutes);
//router.use('/avatars', avatarRoutes);
//router.use('/images', imageRoutes);
router.use('/search', searchRoutes);

module.exports = router;