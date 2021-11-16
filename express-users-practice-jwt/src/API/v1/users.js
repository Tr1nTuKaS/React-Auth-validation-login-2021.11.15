const express = require('express');
const { dbAction, dbFail, dbSuccess } = require('../../utils/dbHelper');
const { hashValue, verifyHash } = require('../../utils/hashHelper');
const { validateRegister } = require('../../utils/validateHelper');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config');

const router = express.Router();

// POST /users/register - create new user,
router.post('/register', validateRegister, async (req, res) => {
  const newUser = {
    email: req.body.email,
    password: hashValue(req.body.password),
  };
  const sql = `
  INSERT INTO users (email, password)
  VALUES ( ?, ? )
  `;
  const dbResult = await dbAction(sql, [newUser.email, newUser.password]);
  console.log('dbResult', dbResult);
  if (dbResult === false) {
    return res.status(500).json({ error: 'something went wrong' });
  }
  if (dbResult.affectedRows === 1) {
    return res.json({ msg: 'register success', newUser: newUser.email });
  }
  console.log('no rows affected');
  res.status(500).json({ error: 'something went wrong' });
});
// validate with joi
// user bcryptjs to hash a password

// POST /users/login - authenticate user (email exists, pass match)
// if valid, generate jwt token with 1h exp date
// send token back to user

router.post('/login', validateRegister, async (req, res) => {
  const sql = 'SELECT * FROM users	 WHERE email = ?';
  const dbResult = await dbAction(sql, [req.body.email]);
  // check if email exsits
  if (dbResult.length !== 1) {
    return dbFail(res, 'email does not exsits', 400);
  }
  // email exists
  // check password
  if (!verifyHash(req.body.password, dbResult[0].password)) {
    return dbFail(res, 'passwords does not exsits');
  }
  // pass match
  const token = jwt.sign({ email: req.body.email }, jwtSecret, {
    expiresIn: '1h',
  });

  const loggeInUser = {
    email: req.body.email,
    token: token,
  };
  dbSuccess(res, loggeInUser);
  // create jwt token and send it back
});

module.exports = router;
