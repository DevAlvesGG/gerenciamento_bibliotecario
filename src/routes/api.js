const express = require('express')
const apiRouter = express.Router()
const booksController = require('../controller/booksController')
const loansController = require('../controller/loansController')
const { ensureAuth } = require('../middleware/auth-middleware')

apiRouter.get('/books', booksController.index)
apiRouter.post('/books', booksController.save)
apiRouter.get('/books/:id', booksController.show)
apiRouter.put('/books/:id', booksController.update)
apiRouter.delete('/books/:id', booksController.delete)

apiRouter.get('/loans', loansController.index)
apiRouter.get('/loans/:id', loansController.show)
apiRouter.post('/loans', ensureAuth , loansController.create)
apiRouter.post('/loans/:id/return', loansController.devolutive)

module.exports = apiRouter