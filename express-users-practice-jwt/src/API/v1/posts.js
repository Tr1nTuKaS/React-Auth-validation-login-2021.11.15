const express = require('express');
const { dbAction, dbFail, dbSuccess } = require('../../utils/dbHelper');
const { authenticateToken } = require('../../utils/middleware');
// const { validateRegister } = require('../../utils/validateHelper');

const router = express.Router();
// POST /posts/new - create new post
// validate with joi
// add correct userID
router.post('/new', async (req, res) => {
  // after validation
  const sql = 'INSERT INTO posts (title, body, userId) VALUES (?, ?, ?)';
  const { title, body, userId } = req.body;
  const dbResult = await dbAction(sql, [title, body, userId]);
  if (dbResult === false) {
    return res.status(500).json({ error: 'sideways' });
  }
  res.json({ msg: 'post created', dbResult });
});

// GET /posts/all - list all post from everyone, join user email
router.get('/all', async (req, res) => {
  const sql = `
  SELECT posts.postId, posts.title, posts.body, posts.timeStamp, users.email AS author
  FROM posts
  INNER JOIN users
  ON users.userId = posts.userId`;
  const dbResult = await dbAction(sql);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});

// DELETE /posts/:id - delete post with postId === :id, Validate with jwt
router.delete('/:id', authenticateToken, async (req, res) => {
  const sql = 'DELETE FROM posts WHERE postId = ? LIMIT 1';
  const dbResult = await dbAction(sql, [req.params.id]);
  if (dbResult === false) {
    dbFail(res);
  }
  if (dbResult.affectedRows === 1) {
    return dbSuccess(res, []);
  }
  dbFail(res, 'no rows affected');
});

// GET /posts - list all posts from current user, using jwt
router.get('/', authenticateToken, async (req, res) => {
  const sql = `
  SELECT posts.postId, posts.title, posts.body, posts.timeStamp, users.email AS author
  FROM posts
  INNER JOIN users
  ON users.userId = posts.userId
  WHERE users.email = ?
  `;
  const dbResult = await dbAction(sql, [req.email]);
  if (dbResult === false) return dbFail(res);
  dbSuccess(res, dbResult);
});
// validate if request has Authorization: Bearer <token>
// take email or id from token
// get all posts belonging to this user

module.exports = router;
