module.exports = `
SELECT id, userPassword FROM users WHERE userToggle='true' AND userMail=?;`;
