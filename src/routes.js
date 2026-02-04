const express = require('express')
const router = express.Router();
const authController = require('./controller/authController')

router.get('/', (req, res) => res.send('Hello Word.'))
router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)

module.exports = router