// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const model = require('../../../../7_models');
const query = require('../../../../9_query/93_reviews/932_get/9322_rank');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51322_cont ] activated get rank query: ${query}`);
    }

    const decoded = await verify(req.headers.token);
    const rows = await model(query, [req.query.color_id, decoded.user_id]);
    res.json({ success: true, rows });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
