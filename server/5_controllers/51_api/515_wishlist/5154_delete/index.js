// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const model = require('../../../../7_models');
const query = require('../../../../9_query/95_wishlists/954_delete');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[5154_cont ] activated delete query: ${query}`);
    }

    const decoded = await verify(req.headers.token);
    if (!decoded.success) res.json({ success: false, message: decoded.message });
    else {
      await model(query, [req.body.color_id, decoded.user_id]);
      res.json({ success: true, message: 'deleted' });
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
