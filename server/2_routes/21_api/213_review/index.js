// Global import
const router = require('express').Router();

// Local import
router.use('/post', require('./2131_post'));
router.use('/get', require('./2132_get'));
router.use('/update', require('./2133_update'));
router.use('/delete', require('./2134_delete'));

module.exports = router;
