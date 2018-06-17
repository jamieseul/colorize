// Global import
const router = require('express').Router();

// Local import
const auth = require('../../../3_middlewares/31_jsonwebtoken/313_auth');
const controller = require('../../../5_controllers/51_api/515_wishlist/5151_post');

router.post('/', auth, controller);

module.exports = router;
