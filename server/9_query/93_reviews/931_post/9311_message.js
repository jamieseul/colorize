module.exports = `
INSERT INTO 
  reviews (itemColors_id, reviewPhoto, reviewRating, users_id, reviewMessage)
VALUES (?,?,?,?,?);`;
