// Global import
const router = require('express').Router();

// Local import
router.use('/color', require('./211_color'));
router.use('/item', require('./212_item'));
router.use('/review', require('./213_review'));
router.use('/user', require('./214_user'));
router.use('/wishlist', require('./215_wishlist'));

module.exports = router;
