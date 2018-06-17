module.exports = `
SELECT id, wishToggle toggle FROM wishLists 
WHERE itemColors_id=? AND users_id=?;`;
