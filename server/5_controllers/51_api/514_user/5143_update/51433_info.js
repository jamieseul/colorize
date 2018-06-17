// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const hash = require('../../../../6_utility/61_bcrypt/611_hash');
const model = require('../../../../7_models');
const query = require('../../../../9_query/94_users/943_update/9433_info');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51433_cont] activated update query: ${query.defined}`);
    }

    const { userPhoto, userName, toneName } = req.body;
    const decoded = await verify(req.headers.token);
    if (req.body.userPassword === undefined) {
      const params = [userPhoto, userName, toneName, decoded.user_id];
      await model(query.undefined, params);
      res.json({ success: true, message: 'updated without password' });
    } else {
      const userPassword = await hash(req.body.userPassword);
      const params = [userPhoto, userName, toneName, userPassword, decoded.user_id];
      await model(query.defined, params);
      res.json({ success: true, message: 'updated with password' });
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
