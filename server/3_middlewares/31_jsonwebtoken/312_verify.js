// Global import
const jwt = require('jsonwebtoken');

// Local import
const { secret } = require('../../0_config');

module.exports = token => new Promise((resolve) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('[312_middle] activated verify token');
  }

  if (token === undefined) {
    resolve({ success: false, message: 'provide token' });
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        resolve({ success: false, message: err.message });
      } else {
        const { user_id, userMail } = decoded;
        resolve({ success: true, user_id, userMail });
      }
    });
  }
});
