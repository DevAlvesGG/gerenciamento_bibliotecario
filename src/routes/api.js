const express = require('express')
const apiRouter = express.Router()
const booksController = require('../controller/booksController')

apiRouter.get('/books', booksController.index)
apiRouter.post('/books', booksController.save)
apiRouter.get('/books/:id', booksController.show)
apiRouter.put('/books/:id', booksController.update)
apiRouter.delete('/books/:id', booksController.delete)

module.exports = apiRouter