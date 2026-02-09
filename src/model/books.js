const uuid = require('uuid').v4
const HttpError = require('../errors/HttpError')

const books = [
    {
        id: uuid(),
        title: 'Book One',
        author: 'Author One',
        quantity: 4
    },

    {
        id: uuid(),
        title: 'Book Two',
        author: 'Author Two',
        quantity: 3
    }
]

module.exports = {

    //function que retorna todos os livros
    getAllBooks: () => books,

    //function para buscar livro pelo id
    getBookById: (id) => books.find((book) => book.id === id),

    //function para criar um livro
    createBook: (title, author, quantity) =>  {
        const newUser = {
            id: uuid(),
            title,
            author,
            quantity
        }
        books.push(newUser)
        return newUser
    },

    //function para atualizar um livro
    updateBook: (id, updatedBook) => {
        const bookIndex = books.findIndex((book) => book.id === id)
        if(bookIndex === -1) throw new HttpError(404,'Livro não encontrado')

        books[bookIndex] = {...books[bookIndex], ...updatedBook}//desestruturo o livro e sobrescrevo com o updatedBook
        return books[bookIndex]
    },

    //function para deletar livros
    deleteBook: (id) => {
        const bookIndex = books.findIndex((book) => book.id === id)
        if(bookIndex === -1) throw new HttpError(404, 'Livro não encontrado')
        const bookDeleted = books.filter((book) => book.id !== id)//filtro pelos livros que são diferente do que vai ser deletado
        return bookDeleted
    },

    takeBooktoLoan: (id) => {
        const bookIndex = books.findIndex((book) => book.id === id)
        if(bookIndex === -1) throw new HttpError(404, 'Livro não encontrado')

        books[bookIndex].quantity -= 1
    },

    devolutiveLoan: (id) => {
        const bookIndex = books.findIndex((book) => book.id === id)
        if(bookIndex === -1) throw new HttpError(404, 'Livro não encontrado')

        books[bookIndex].quantity += 1
    }
}