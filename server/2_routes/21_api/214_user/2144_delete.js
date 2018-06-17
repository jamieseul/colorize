// Global import
const router = require('express').Router();

// Local import
const controller = require('../../../5_controllers/51_api/514_user/5144_delete');

router.post('/', controller);

module.exports = router;
