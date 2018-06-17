module.exports = {
  true: `
UPDATE reviewLikes SET likeToggle="false" WHERE reviews_id=? AND users_id=?;`,
  false: `
UPDATE reviewLikes SET likeToggle="true" WHERE reviews_id=? AND users_id=?;`,
};
