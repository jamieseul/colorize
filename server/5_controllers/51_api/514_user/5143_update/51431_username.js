// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const check = require('../../../../6_utility/60_check/602_userName');

module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[51431_cont] activated check username query: ${check}`);
    }

    const decoded = await verify(req.headers.token);
    if (!decoded.success) res.json({ success: false, message: decoded.message });
    else {
      const userName = await check(req.body.userName);
      switch (userName.length) {
        case 0: {
          res.json({ success: true, message: 'valid username' });
          break;
        }
        case 1: {
          res.json({ success: false, message: 'invalid username' });
          break;
        }
        default: {
          res.json({ success: false, message: 'unexpected error' });
        }
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
