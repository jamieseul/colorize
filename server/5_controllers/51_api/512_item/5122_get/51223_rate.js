// Local import
const model = require('../../../../7_models');
const query = require('../../../../9_query/92_items/922_get/9223_rate');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51223_cont] activated rate query: ${query}`);
    }

    const params = [req.query.color_id];
    const rows = await model(query, params);
    res.json({ success: true, rows });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
