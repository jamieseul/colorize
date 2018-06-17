// Global import
const router = require('express').Router();

// Local import
router.use('/post', require('./2121_post'));
router.use('/get', require('./2122_get'));
router.use('/update', require('./2123_update'));
router.use('/delete', require('./2124_delete'));

module.exports = router;
