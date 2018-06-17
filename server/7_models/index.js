// Local import
const mysql = require('../8_mysql');

module.exports = (query, params) => new Promise((resolve) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[7_model   ] activated params: ${params}`);
  }

  mysql.query(query, params, (err, rows) => {
    if (err) {
      resolve(err.message);
    } else {
      resolve(rows);
    }
  });
});
