module.exports = {
  zero: `
SELECT u.id user_id, u.userPhoto user_photo, u.userName name, 
  YEAR(NOW())-YEAR(u.birthDate) age, t.toneName tone, u.gender gender, 
  IFNULL(NULL, 0) rating, IFNULL(NULL, '') message, IFNULL(NULL, '') writeAt,
  IFNULL(NULL, 0) likes, u.grade grade
FROM tones t, users u
WHERE u.userToggle='true' AND t.id=u.tones_id AND u.id=?;`,
  one: `
SELECT user_id, review_photo, user_photo, name, age, tone, gender, rating, 
  message, writeAt, likes, grade
FROM (SELECT color_id, user_id, review_photo, user_photo, name, tone, age, gender, 
    IFNULL(message, '') message, IFNULL(writeAt, '') writeAt, 
    IFNULL(rating, 0) rating, IFNULL(likes, 0) likes, grade
  FROM (SELECT color_id, t1.user_id, review_photo, user_photo, name, tone, age, 
      gender, message, writeAt, rating, review_id, grade
    FROM (SELECT u.id user_id, u.userPhoto user_photo, u.userName name, 
        u.grade grade, t.toneName tone, YEAR(NOW())-YEAR(u.birthDate) age, 
        u.gender gender 
      FROM tones t, users u
      WHERE u.userToggle='true' AND t.id=u.tones_id) t1
    LEFT JOIN (SELECT r.users_id user_id, r.reviewPhoto review_photo, 
        r.itemColors_id color_id, r.id review_id,
        r.reviewMessage message, r.reviewTime writeAt, r.reviewRating rating
      FROM reviews r
      WHERE r.reviewToggle='true') t2
    ON t1.user_id=t2.user_id) t3
  LEFT JOIN (SELECT r.id review_id, COUNT(rl.id) likes
    FROM reviews r, reviewLikes rl
    WHERE r.reviewToggle='true' AND rl.likeToggle='true' AND r.id=rl.reviews_id
    GROUP BY r.id) t4
  ON t3.review_id=t4.review_id) td
WHERE color_id=? AND user_id=?;`,
};
