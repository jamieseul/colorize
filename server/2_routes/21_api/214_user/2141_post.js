// Global import
const router = require('express').Router();

// Local import
const auth = require('../../../3_middlewares/31_jsonwebtoken/313_auth');
const upload = require('../../../3_middlewares/32_multer/323_multer-s3-transform');
const controller = require('../../../5_controllers/51_api/514_user/5141_post');

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/upload', auth, upload);

module.exports = router;
