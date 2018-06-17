module.exports = `
INSERT INTO 
  items (categories2_id, brands_id, itemName, itemVolume, itemPrice, itemDetail) 
VALUES ((SELECT id FROM categories2 WHERE category2Name=?),
  (SELECT id FROM brands WHERE brandsName=?),?,?,?,?);`;
