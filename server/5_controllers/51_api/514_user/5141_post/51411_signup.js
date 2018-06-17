// Local import
const hash = require('../../../../6_utility/61_bcrypt/611_hash');
const check = require('../../../../6_utility/60_check');
const model = require('../../../../7_models');
const query = require('../../../../9_query/94_users/941_post/9411_signup');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51411_cont] activated signup query: ${query}`);
    }

    const userPassword = await hash(req.body.userPassword);
    const {
      userMail, userName, toneName, birthDate, gender,
    } = req.body;
    const params = [userMail, userPassword, userName, toneName, birthDate, gender];
    const mail = await check.userMail(userMail);
    const name = await check.userName(userName);

    if (mail.length) res.json({ success: false, message: 'invalid mail' });
    else if (name.length) res.json({ success: false, message: 'invalid name' });
    else {
      await model(query, params);
      res.json({ success: true, message: `${userMail} registered` });
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
