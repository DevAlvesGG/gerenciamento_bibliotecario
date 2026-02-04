const express = require('express')
const router = express.Router();
const authController = require('./controller/authController');
const { ensureAuth } = require('./middleware/auth-middleware');

router.get('/', (req, res) => res.send('Hello Word.'))
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)
router.get('/auth/teste', ensureAuth, (req, res) => res.json({ message: 'ok'}))

module.exports = router