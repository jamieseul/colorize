// Local import
const model = require('../../../../7_models');
const query = require('../../../../9_query/91_colors/911_post');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[5111_cont ] activated post query: ${query}`);
    }

    const {
      items_id, itemPhoto, itemColor, itemHex, itemDate,
    } = req.body;
    const params = [items_id, itemPhoto, itemColor, itemHex, itemDate];
    await model(query, params);
    res.json({ success: true, message: 'posted' });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
