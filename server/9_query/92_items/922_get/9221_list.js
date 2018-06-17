module.exports = {
  price_DESC: `
SELECT ic.id color_id, ic.itemHex hex, ic.itemPhoto item_photo, c.category2Name category,
  ic.itemColor color, b.brandName brand, i.itemName name, i.itemPrice price,
  i.itemVolume volume, ic.itemDate date, rate.total reviews, rate.avg avg 
FROM itemColors ic, categories2 c, brands b, items i,
  (SELECT ici.id color_id, IFNULL(AVG(rt.reviewRating),0) avg, COUNT(rt.id) total
  FROM itemColors ici
  LEFT JOIN reviews rt
  ON ici.id=rt.itemColors_id AND rt.reviewToggle='true'
  GROUP BY ici.id) rate
WHERE i.itemToggle='true' AND ic.colorToggle='true' AND
  c.id=i.categories2_id AND b.id=i.brands_id AND i.id=ic.items_id AND
  ic.id=rate.color_id AND ic.id IN (?) ORDER BY price DESC;`,
  price_ASC: `
SELECT ic.id color_id, ic.itemHex hex, ic.itemPhoto item_photo, c.category2Name category,
  ic.itemColor color, b.brandName brand, i.itemName name, i.itemPrice price,
  i.itemVolume volume, ic.itemDate date, rate.total reviews, rate.avg avg 
FROM itemColors ic, categories2 c, brands b, items i,
  (SELECT ici.id color_id, IFNULL(AVG(rt.reviewRating),0) avg, COUNT(rt.id) total
  FROM itemColors ici
  LEFT JOIN reviews rt
  ON ici.id=rt.itemColors_id AND rt.reviewToggle='true'
  GROUP BY ici.id) rate
WHERE i.itemToggle='true' AND ic.colorToggle='true' AND
  c.id=i.categories2_id AND b.id=i.brands_id AND i.id=ic.items_id AND
  ic.id=rate.color_id AND ic.id IN (?) ORDER BY price ASC;`,
  avg_DESC: `
SELECT ic.id color_id, ic.itemHex hex, ic.itemPhoto item_photo, c.category2Name category,
  ic.itemColor color, b.brandName brand, i.itemName name, i.itemPrice price,
  i.itemVolume volume, ic.itemDate date, rate.total reviews, rate.avg avg 
FROM itemColors ic, categories2 c, brands b, items i,
  (SELECT ici.id color_id, IFNULL(AVG(rt.reviewRating),0) avg, COUNT(rt.id) total
  FROM itemColors ici
  LEFT JOIN reviews rt
  ON ici.id=rt.itemColors_id AND rt.reviewToggle='true'
  GROUP BY ici.id) rate
WHERE i.itemToggle='true' AND ic.colorToggle='true' AND
  c.id=i.categories2_id AND b.id=i.brands_id AND i.id=ic.items_id AND
  ic.id=rate.color_id AND ic.id IN (?) ORDER BY avg DESC;`,
  date_DESC: `
SELECT ic.id color_id, ic.itemHex hex, ic.itemPhoto item_photo, c.category2Name category,
  ic.itemColor color, b.brandName brand, i.itemName name, i.itemPrice price,
  i.itemVolume volume, ic.itemDate date, rate.total reviews, rate.avg avg 
FROM itemColors ic, categories2 c, brands b, items i,
  (SELECT ici.id color_id, IFNULL(AVG(rt.reviewRating),0) avg, COUNT(rt.id) total
  FROM itemColors ici
  LEFT JOIN reviews rt
  ON ici.id=rt.itemColors_id AND rt.reviewToggle='true'
  GROUP BY ici.id) rate
WHERE i.itemToggle='true' AND ic.colorToggle='true' AND
  c.id=i.categories2_id AND b.id=i.brands_id AND i.id=ic.items_id AND
  ic.id=rate.color_id AND ic.id IN (?) ORDER BY date DESC;`,
  reviews_DESC: `
SELECT ic.id color_id, ic.itemHex hex, ic.itemPhoto item_photo, c.category2Name category,
  ic.itemColor color, b.brandName brand, i.itemName name, i.itemPrice price,
  i.itemVolume volume, ic.itemDate date, rate.total reviews, rate.avg avg 
FROM itemColors ic, categories2 c, brands b, items i,
  (SELECT ici.id color_id, IFNULL(AVG(rt.reviewRating),0) avg, COUNT(rt.id) total
  FROM itemColors ici
  LEFT JOIN reviews rt
  ON ici.id=rt.itemColors_id AND rt.reviewToggle='true'
  GROUP BY ici.id) rate
WHERE i.itemToggle='true' AND ic.colorToggle='true' AND
  c.id=i.categories2_id AND b.id=i.brands_id AND i.id=ic.items_id AND
  ic.id=rate.color_id AND ic.id IN (?) ORDER BY reviews DESC;`,
};
