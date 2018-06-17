// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const model = require('../../../../7_models');
const query = require('../../../../9_query/93_reviews/932_get');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51321_cont ] activated get info query: ${query.check.info}`);
    }

    const decoded = await verify(req.headers.token);
    const check = await model(query.check.info, [req.query.color_id, decoded.user_id]);
    switch (check.length) {
      case 0: {
        const rows = await model(query.info.zero, decoded.user_id);
        res.json({ success: true, message: 'not written', rows });
        break;
      }
      case 1: {
        const rows = await model(query.info.one, [req.query.color_id, decoded.user_id]);
        res.json({ success: true, message: 'written', rows });
        break;
      }
      default: {
        res.json({ success: false, message: 'unexpected error' });
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};

