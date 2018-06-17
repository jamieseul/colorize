module.exports = {
  member: `
SELECT t1.*, IFNULL(t2.wish, 'false') wish
FROM (SELECT ic1.id color_id, ic1.itemHex hex, ic1.itemPhoto item_photo, c.category2Name category,
    ic1.itemColor color, b.brandName brand, i.itemName name, i.itemPrice price,
    i.itemVolume volume, ic1.itemDate date, i.itemDetail description
  FROM itemColors ic1, categories2 c, brands b, items i 
  WHERE i.itemToggle='true' AND ic1.colorToggle='true' AND
    c.id=i.categories2_id AND b.id=i.brands_id AND i.id=ic1.items_id AND ic1.id=?) t1
LEFT JOIN (SELECT ic.id color_id, w.wishToggle wish
  FROM wishLists w, users u, itemColors ic
  WHERE w.wishToggle='true' AND u.userToggle='true' AND ic.colorToggle='true' AND
    u.id=w.users_id AND ic.id=w.itemColors_id AND u.id=?) t2
ON t1.color_id=t2.color_id;`,
  visitor: `
SELECT ic.id color_id, ic.itemHex hex, ic.itemPhoto item_photo, c.category2Name category,
  ic.itemColor color, b.brandName brand, i.itemName name, i.itemPrice price,
  i.itemVolume volume, ic.itemDate date, i.itemDetail description
FROM itemColors ic, categories2 c, brands b, items i 
WHERE i.itemToggle='true' AND ic.colorToggle='true' AND
  c.id=i.categories2_id AND b.id=i.brands_id AND i.id=ic.items_id AND ic.id=?;`,
};
