const express = require('express')
const authRouter = express.Router();
const authController = require('../controller/authController');
const { ensureAuth } = require('../middleware/auth-middleware');

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.get('/teste', ensureAuth, (req, res) => res.json({ message: 'ok'}))

module.exports = authRouter