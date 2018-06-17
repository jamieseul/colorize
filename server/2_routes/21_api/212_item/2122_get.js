// Global import
const router = require('express').Router();

// Local import
const controller = require('../../../5_controllers/51_api/512_item/5122_get');

router.get('/list', controller.list);
router.get('/detail', controller.detail);
router.get('/rate', controller.rate);
router.get('/search', controller.search);

module.exports = router;
