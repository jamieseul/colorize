// Global import
const router = require('express').Router();

// Local import
const auth = require('../../../3_middlewares/31_jsonwebtoken/313_auth');
const controller = require('../../../5_controllers/51_api/514_user/5142_get');

router.get('/check', controller.check);
router.get('/info', auth, controller.info);

module.exports = router;
