// Global import
const router = require('express').Router();

// Local import
router.use('/post', require('./2141_post'));
router.use('/get', require('./2142_get'));
router.use('/update', require('./2143_update'));
// router.use('/delete', require('./2144_delete'));

module.exports = router;
