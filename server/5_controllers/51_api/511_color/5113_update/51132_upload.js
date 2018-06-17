// Global import
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

// Local import
const { credentials, bucket } = require('../../../../0_config');
const model = require('../../../../7_models');
const query = require('../../../../9_query/91_colors/913_update/9132_upload');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('[322_middle] activated multer-s3 to upload');
    }

    const s3 = await new aws.S3({ credentials });
    const upload = await multer({
      storage: multerS3({
        s3,
        bucket: (req.headers.id)
          ? `${bucket}/${req.originalUrl.split('/')[2]}/${req.headers.id}`
          : `${bucket}/${req.originalUrl.split('/')[2]}/${req.user_id}`,
        acl: 'public-read',
        cacheControl: 'max-age=31536000',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        storageClass: 'REDUCED_REDUNDANCY',
        metadata(req, file, cb) {
          cb(null, { fieldName: file.fieldname });
        },
        key(req, file, cb) {
          cb(null, `${Date.now().toString()}_${file.originalname}`);
        },
      }),
    }).single('file');

    upload(req, res, (err) => {
      if (err) {
        res.json({ success: false, message: err.message });
      } else {
        const params = [req.file.location, req.file.originalname.split('.')[0]];
        model(query, params);
        res.json({ success: true, message: 'updated' });
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
