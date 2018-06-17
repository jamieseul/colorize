// Local import
const mysql = require('../../8_mysql');
const query = require('../../9_query/93_reviews/932_get/9320_check');

module.exports = (review_id, user_id) => new Promise((resolve) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[603_util  ] activated check reivew_id: ${review_id}`);
  }

  mysql.query(query.reviewLikes, [review_id, user_id], (err, rows) => {
    if (err) {
      resolve(err);
    } else {
      resolve(rows);
    }
  });
});
