// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const model = require('../../../../7_models');
const query = require('../../../../9_query/94_users/942_get/9420_check');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51420_cont] activated check query: ${query.userMail}`);
    }

    const decoded = await verify(req.headers.token);
    if (!decoded.success) res.json({ success: false, message: decoded.message });
    else {
      await model(query.userMail, decoded.user_id);
      res.json({ success: true, user_id: decoded.user_id });
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
