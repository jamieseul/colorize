module.exports = `
SELECT ic.id color_id, r.id review_id, r.reviewPhoto review_photo, 
  u.userPhoto user_photo, u.userName name, YEAR(NOW())-YEAR(u.birthDate) age, 
  t.toneName tone, r.reviewRating rating, r.reviewMessage message, 
  r.reviewTime writeAt, rl.likes likes, ic.itemHex hex, ic.itemPhoto item_photo, 
  c.category2Name category, ic.itemColor color, b.brandName brand, 
  i.itemName name, i.itemPrice price, i.itemVolume volume, ic.itemDate date, 
  r.reviewToggle toggle
FROM itemColors ic, users u, reviews r, tones t,
  (SELECT ri.id review_id, IFNULL(COUNT(CASE WHEN rli.likeToggle='true' THEN 1 END),0) likes
  FROM reviews ri
LEFT JOIN reviewLikes rli
ON ri.id=rli.reviews_id GROUP BY ri.id) rl,
  categories2 c, brands b, items i
WHERE ic.colorToggle='true' AND u.userToggle='true' AND r.reviewToggle='true' AND
  c.id=i.categories2_id AND b.id=i.brands_id AND i.id=ic.items_id AND
  ic.id=r.itemColors_id AND u.id=r.users_id AND t.id=u.tones_id AND
  r.id=rl.review_id AND u.id=?
ORDER BY writeAt DESC;`;
