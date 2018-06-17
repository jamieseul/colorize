// Global import
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3Transform = require('multer-s3-transform');
const sharp = require('sharp');

// Local import
const { credentials, bucket } = require('../../0_config');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('[323_middle] activated multer-s3-transform to upload');
    }

    const s3 = await new aws.S3({ credentials });
    const upload = await multer({
      storage: multerS3Transform({
        s3,
        bucket: (req.headers.id)
          ? `${bucket}/${req.originalUrl.split('/')[2]}/${req.headers.id}`
          : `${bucket}/${req.originalUrl.split('/')[2]}/${req.user_id}`,
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        contentType: multerS3Transform.AUTO_CONTENT_TYPE,
        storageClass: 'REDUCED_REDUNDANCY',
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        shouldTransform: (req, file, cb) => {
          cb(null, /^image/i.test(file.mimetype));
        },
        transforms: [{
          id: 'transformed',
          key(req, file, cb) {
            cb(null, `${Date.now().toString()}_${file.originalname}`);
          },
          transform(req, file, cb) {
            switch (req.headers.orientation) {
              case '6': {
                return cb(null, sharp().rotate(90).resize(400, 400).jpeg());
              }
              case '3': {
                return cb(null, sharp().rotate(180).resize(400, 400).jpeg());
              }
              case '8': {
                return cb(null, sharp().rotate(270).resize(400, 400).jpeg());
              }
              case '5': {
                return cb(null, sharp().rotate(90).resize(400, 400).jpeg());
              }
              case '4': {
                return cb(null, sharp().rotate(180).resize(400, 400).jpeg());
              }
              case '7': {
                return cb(null, sharp().rotate(270).resize(400, 400).jpeg());
              }
              default: {
                return cb(null, sharp().resize(400, 400).jpeg());
              }
            }
          },
        }],
      }),
    }).single('img');

    upload(req, res, (err) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        res.json({ success: true, message: req.file.transforms[0].location });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
