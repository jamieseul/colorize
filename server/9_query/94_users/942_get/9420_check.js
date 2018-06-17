module.exports = {
  userMail: `
SELECT id FROM users WHERE userMail=?;`,
  userName: `
SELECT id FROM users WHERE userName=?;`,
};
