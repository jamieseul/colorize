// Global import
const bcrypt = require('bcrypt');

// Local import
const { saltRounds } = require('../../0_config');

module.exports = async (userPassword) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[611_util  ] activated hash password: ${userPassword}`);
    }

    const hash = await bcrypt.hash(userPassword, saltRounds);
    return hash;
  } catch (error) {
    return error.stack;
  }
};
