// Local import
const mysql = require('../../8_mysql');
const query = require('../../9_query/94_users/942_get/9420_check');

module.exports = userMail => new Promise((resolve) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[601_util  ] activated check mail: ${userMail}`);
  }

  mysql.query(query.userMail, userMail, (err, rows) => {
    if (err) {
      resolve(err);
    } else {
      resolve(rows);
    }
  });
});
