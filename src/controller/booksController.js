const books = require('../model/books')

module.exports = {
    //GET /api/books
    index: (req, res) => {
        const showBooks = books.getAllBooks()
        res.status(200).json(showBooks)
    },
    //GET /api/books/:id
    show: (req, res) => {
        const { id } = req.params
        const book = books.getBookById(id)
        if(!book) throw new HttpError(404, 'Livro não encontrado')
        return res.status(200).json(book)
    },
    //POST /api/books
    save: (req, res) => {
        const { title, author, quantity } = req.body

        if(typeof title !== 'string' || typeof author !== 'string' || typeof quantity !== "number") throw new Error('Valide os campos novamente')

        const create = books.createBook(title, author, quantity)
        return res.status(201).json(create)
    },

    //PUT /api/books/:id
    update: (req, res) => {
        const { id } = req.params
        const { title, author, quantity } = req.body
        const update = {
            title,
            author,
            quantity
        }
        const newUpdate = books.updateBook(id, update)
        res.status(200).json(newUpdate)
    },

    //DELETE /api/books/:id
    delete: (req, res) => {
        const { id } = req.params;
        const deletedBook = books.deleteBook(id)
        return res.status(200).json(deletedBook)
    }
}