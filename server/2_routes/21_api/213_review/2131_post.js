// Global import
const router = require('express').Router();

// Local import
const auth = require('../../../3_middlewares/31_jsonwebtoken/313_auth');
const upload = require('../../../3_middlewares/32_multer/323_multer-s3-transform');
const controller = require('../../../5_controllers/51_api/513_review/5131_post');

router.post('/message', auth, controller);
router.post('/upload', auth, upload);

module.exports = router;
