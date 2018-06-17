// Local import
const model = require('../../../../7_models');
const query = require('../../../../9_query/92_items/922_get/9221_list');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51221_cont] activated list query: ${query.avg_DESC}`);
    }

    const colors = await JSON.parse(req.query.color_id);
    const params = [colors];
    switch (req.query.order_by) {
      case 'price DESC': {
        const rows = await model(query.price_DESC, params);
        res.json({ success: true, rows });
        break;
      }
      case 'price ASC': {
        const rows = await model(query.price_ASC, params);
        res.json({ success: true, rows });
        break;
      }
      case 'avg DESC': {
        const rows = await model(query.avg_DESC, params);
        res.json({ success: true, rows });
        break;
      }
      case 'date DESC': {
        const rows = await model(query.date_DESC, params);
        res.json({ success: true, rows });
        break;
      }
      case 'reviews DESC': {
        const rows = await model(query.reviews_DESC, params);
        res.json({ success: true, rows });
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
