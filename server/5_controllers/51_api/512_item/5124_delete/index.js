// Local import
const model = require('../../../../7_models');
const query = require('../../../../9_query/92_items/924_delete');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[5124_cont ] activated delete query: ${query}`);
    }

    await model(query, req.body.color_id);
    res.json({ success: true, message: 'deleted' });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
