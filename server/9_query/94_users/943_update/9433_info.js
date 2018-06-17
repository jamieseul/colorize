module.exports = {
  undefined: `
UPDATE users SET userPhoto=?, userName=?, 
  tones_id=(SELECT id FROM tones WHERE toneName=?) WHERE id=?;`,
  defined: `
UPDATE users SET userPhoto=?, userName=?, 
  tones_id=(SELECT id FROM tones WHERE toneName=?), userPassword=? WHERE id=?;`,
};
