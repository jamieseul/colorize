// Local import
const model = require('../../../../7_models');
const query = require('../../../../9_query/92_items/922_get/9224_search');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51224_cont] activated search query: ${query}`);
    }

    const rows = await model(query);
    res.json({ success: true, rows });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
