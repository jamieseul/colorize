module.exports = {
  info: `
SELECT id FROM reviews WHERE reviewToggle='true' AND itemColors_id=? AND users_id=?;`,
  reviewLikes: `
SELECT u.id user_id, r.id review_id, rl.likeToggle toggle 
FROM reviewLikes rl, reviews r, users u
WHERE r.reviewToggle='true' AND u.userToggle='true' AND
  u.id=rl.users_id AND r.id=rl.reviews_id AND r.id=? AND u.id=?;`,
};
