module.exports = `
INSERT INTO itemColors (items_id, itemPhoto, itemColor, itemHex, itemDate) 
VALUES ((SELECT id FROM items WHERE itemName=?),?,?,?,?);`;
