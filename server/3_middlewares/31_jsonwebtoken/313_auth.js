// Local import
const verify = require('./312_verify');
const mysql = require('../../8_mysql');
const query = require('../../9_query/94_users/942_get/9420_check');

module.exports = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log('[313_middle] activated auth');
    }

    if (req.headers.token === undefined) {
      res.json({ success: false, message: 'provide token' });
    } else {
      const decoded = await verify(req.headers.token);
      console.log('decoded', decoded);
      if (!decoded.success) {
        res.json(decoded);
      } else {
        mysql.query(query.userMail, decoded.userMail, (err, rows) => {
          if (err) {
            res.json({ success: false, message: 'invalid mail' });
          } else if (rows.length) {
            req.user_id = decoded.user_id;
            next();
          }
        });
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
