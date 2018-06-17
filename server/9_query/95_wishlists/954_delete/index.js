module.exports = `
UPDATE wishLists SET wishToggle='false' WHERE itemColors_id=? AND users_id=?;`;
