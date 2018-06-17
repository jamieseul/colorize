// Local import
const model = require('../../../../7_models');
const query = require('../../../../9_query/91_colors/912_get/9121_list');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[5112_cont ] activated get query: ${query}`);
    }

    const rows = await model(query);
    res.json({ success: true, rows });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
