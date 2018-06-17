// Global import
const multer = require('multer');

// Local import
const { multerConfig } = require('../../0_config');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('[321_middle] activated multer to upload');
    }

    const storage = await multer.diskStorage(multerConfig);
    const upload = await multer({ storage }).single('file');

    upload(req, res, (err) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({ success: true, meesage: req.file.path });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
