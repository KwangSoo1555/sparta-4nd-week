import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();
const saltRounds = 10;

router.post('/signup', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({
      error: 'name and password are incorrect. you must fill in the blanks.',
    });
  }

  try {
    //name
    const checkSignupUserQuery = 'SELECT name FROM user WHERE name = ?';
    const [user, _] = await req.dbConnect.query(checkSignupUserQuery, [name]);

    if (user.length > 0) {
      return res.status(403).json({
        message: 'This name already subscribed. use a different name.',
      });
    }

    //password
    const hash = await bcrypt.hash(password, saltRounds);

    const query = 'INSERT INTO user (name, password) VALUES (?, ?)';
    await req.dbConnect.query(query, [name, hash]);

    res.status(201).json({ message: 'Sign up is complete.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export { router };
