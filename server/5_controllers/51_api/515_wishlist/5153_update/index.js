// Local import
const verify = require('../../../../3_middlewares/31_jsonwebtoken/312_verify');
const check = require('../../../../6_utility/60_check/604_wishlist');
const model = require('../../../../7_models');
const insert = require('../../../../9_query/95_wishlists/951_post');
const pop = require('../../../../9_query/95_wishlists/953_update');
const hide = require('../../../../9_query/95_wishlists/954_delete');


module.exports = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[5153_cont ] activated update query: ${pop}`);
    }

    const decoded = await verify(req.headers.token);
    const exist = await check(req.body.color_id, decoded.user_id);
    if (!exist.length) {
      await model(insert, [req.body.color_id, decoded.user_id]);
      res.json({ success: true, message: true });
    } else {
      switch (exist[0].toggle) {
        case 'true': {
          await model(hide, [req.body.color_id, decoded.user_id]);
          res.json({ success: true, message: false });
          break;
        }
        case 'false': {
          await model(pop, [req.body.color_id, decoded.user_id]);
          res.json({ success: true, message: true });
          break;
        }
        default: {
          res.json({ success: false, message: 'unexpected error' });
          break;
        }
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.stack });
  }
};
