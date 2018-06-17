// Global import
const router = require('express').Router();

// Local import
router.use('/post', require('./2111_post'));
router.use('/get', require('./2112_get'));
router.use('/update', require('./2113_update'));
router.use('/delete', require('./2114_delete'));

module.exports = router;
