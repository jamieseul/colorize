// Local import
const mysql = require('../../8_mysql');
const query = require('../../9_query/95_wishlists/952_get/9520_check');

module.exports = (color_id, user_id) => new Promise((resolve) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[604_util  ] activated check color_id: ${color_id}`);
  }

  mysql.query(query, [color_id, user_id], (err, rows) => {
    if (err) {
      resolve(err);
    } else {
      resolve(rows);
    }
  });
});
