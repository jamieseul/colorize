// Global import
const router = require('express').Router();

// Local import
const controller = require('../../../5_controllers/51_api/511_color/5112_get');

router.get('/', controller);

module.exports = router;
