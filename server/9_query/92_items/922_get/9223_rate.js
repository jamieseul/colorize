module.exports = `
SELECT IFNULL(AVG(reviewRating),0) avg, COUNT(id) total,
  COUNT(CASE WHEN reviewRating='1' THEN 1 END) s,
  COUNT(CASE WHEN reviewRating='2' THEN 1 END) ss,
  COUNT(CASE WHEN reviewRating='3' THEN 1 END) sss,
  COUNT(CASE WHEN reviewRating='4' THEN 1 END) ssss,
  COUNT(CASE WHEN reviewRating='5' THEN 1 END) sssss
FROM reviews
WHERE reviewToggle='true' AND itemColors_id=?;`;
