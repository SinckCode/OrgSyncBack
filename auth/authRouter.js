const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateUser } = require('./authService');

const router = express.Router();
const SECRET_KEY = 'mi_secreto_super_seguro';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  try {
    const user = authenticateUser(username, password);

    const token = jwt.sign(
      { username: user.username, role: user.role, specialMessage: user.specialMessage || null },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login exitoso', user, token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});


module.exports = router;
