// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const compare = require('../../../../6_utility/61_bcrypt/612_compare');
const model = require('../../../../7_models');
const query = require('../../../../9_query/94_users/943_update/9432_password');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51432_cont] activated compare password query: ${query}`);
    }

    const decoded = await verify(req.headers.token);
    if (!decoded.success) res.json({ success: false, message: decoded.message });
    else {
      const rows = await model(query, decoded.user_id);
      const valid = await compare(req.body.userPassword, rows[0].userPassword);
      if (!valid) {
        res.json({ success: false, message: 'invalid password' });
      } else {
        res.json({ success: true, message: 'valid password' });
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
