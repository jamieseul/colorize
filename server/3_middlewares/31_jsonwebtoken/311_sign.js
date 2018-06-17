// Global import
const jwt = require('jsonwebtoken');

// Local import
const { secret, expiresIn } = require('../../0_config');

module.exports = async (id, userMail) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('[311_middle] activated sign token');
    }

    const token = jwt.sign({ user_id: id, userMail }, secret, { expiresIn });
    return token;
  } catch (error) {
    return error.stack;
  }
};
