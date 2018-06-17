module.exports = `
SELECT userPassword FROM users WHERE userToggle='true' AND id=?;`;
