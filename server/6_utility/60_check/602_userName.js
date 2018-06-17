// Local import
const mysql = require('../../8_mysql');
const query = require('../../9_query/94_users/942_get/9420_check');

module.exports = userName => new Promise((resolve) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[602_util  ] activated check name: ${userName}`);
  }

  mysql.query(query.userName, userName, (err, rows) => {
    if (err) {
      resolve(err);
    } else {
      resolve(rows);
    }
  });
});
