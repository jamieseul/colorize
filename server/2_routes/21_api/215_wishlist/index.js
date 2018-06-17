// Global import
const router = require('express').Router();

// Local import
// router.use('/post', require('./2151_post'));
router.use('/get', require('./2152_get'));
router.use('/update', require('./2153_update'));
router.use('/delete', require('./2154_delete'));

module.exports = router;
