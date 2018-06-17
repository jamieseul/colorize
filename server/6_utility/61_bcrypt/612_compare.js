// Global import
const bcrypt = require('bcrypt');

module.exports = async (password, hash) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[612_util  ] activated campare password: ${password}`);
    }
    const boolean = await bcrypt.compare(password, hash);
    return boolean;
  } catch (error) {
    return error.stack;
  }
};
