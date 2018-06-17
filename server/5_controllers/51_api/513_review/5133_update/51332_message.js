// Local import
const model = require('../../../../7_models');
const query = require('../../../../9_query/93_reviews/933_update/9332_message');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51332_cont] activated update message query: ${query}`);
    }

    const {
      review_id, reviewPhoto, reviewRating, reviewMessage,
    } = req.body;
    const params = [reviewPhoto, reviewRating, reviewMessage, review_id];
    await model(query, params);
    res.json({ success: true, message: 'updated' });
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
