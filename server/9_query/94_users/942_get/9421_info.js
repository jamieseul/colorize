module.exports = `
SELECT u.userMail mail, u.userPhoto user_photo, u.userName name, t.toneName tone, 
  u.birthDate birth, u.gender gender, u.grade grade
FROM users u, tones t 
WHERE userToggle='true' AND t.id=u.tones_id AND u.id=?;`;
