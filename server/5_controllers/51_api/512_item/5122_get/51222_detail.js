// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const model = require('../../../../7_models');
const query = require('../../../../9_query/92_items/922_get/9222_detail');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51222_cont] activated detail query: ${query.visitor}`);
    }

    const decoded = await verify(req.headers.token);
    switch (decoded.success) {
      case true: {
        const rows = await model(query.member, [req.query.color_id, decoded.user_id]);
        res.json({ success: true, message: decoded.userMail, rows });
        break;
      }
      case false: {
        const rows = await model(query.visitor, req.query.color_id);
        res.json({ success: true, message: 'unknown visitor', rows });
        break;
      }
      default: {
        res.json({ success: false, message: 'unexpected error' });
        break;
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
