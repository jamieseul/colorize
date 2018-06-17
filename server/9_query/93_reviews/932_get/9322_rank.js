module.exports = `
SELECT m.*, IFNULL(t.toggle,'false') toggle
FROM
(SELECT r.id review_id, r.reviewPhoto review_photo, u.userPhoto user_photo,
  u.userName name, YEAR(NOW())-YEAR(u.birthDate) age, t.toneName tone,
  u.gender gener, r.reviewRating rating, r.reviewMessage message, 
  r.reviewTime writeAt, rl.likes likes, u.grade grade
  FROM itemColors ic, users u, reviews r, tones t, 
    (SELECT ri.id review_id, IFNULL(COUNT(CASE WHEN rli.likeToggle='true' THEN 1 END),0) likes 
    FROM reviews ri
    LEFT JOIN reviewLikes rli 
    ON ri.id=rli.reviews_id GROUP BY ri.id) rl
  WHERE ic.colorToggle='true' AND u.userToggle='true' AND r.reviewToggle='true' AND
    ic.id=r.itemColors_id AND u.id=r.users_id AND t.id=u.tones_id AND 
    r.id=rl.review_id AND ic.id=?) m
LEFT JOIN
  (SELECT rj.id review_id, rlj.likeToggle toggle 
  FROM users uj, reviews rj, reviewLikes rlj
  WHERE uj.userToggle='true' AND rj.reviewToggle='true' AND rlj.likeToggle='true' AND
    uj.id=rlj.users_id AND rj.id=rlj.reviews_id AND
    uj.id=?) t
ON m.review_id=t.review_id
ORDER BY likes DESC LIMIT 3;`;
