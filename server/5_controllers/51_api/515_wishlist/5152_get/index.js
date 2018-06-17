// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const model = require('../../../../7_models');
const query = require('../../../../9_query/95_wishlists/952_get/9521_list');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[5152_cont ] activated get query: ${query}`);
    }

    const decoded = await verify(req.headers.token);
    if (!decoded.success) res.json({ success: false, message: decoded.message });
    else {
      const rows = await model(query, decoded.user_id);
      res.json({ success: true, rows });
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
