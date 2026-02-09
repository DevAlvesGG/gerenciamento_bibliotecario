const loans = require('../model/loans')
const HttpError = require('../errors/HttpError')
const books = require('../model/books')


module.exports ={
    // GET /api/loans
    index: (req, res) => {
        const alloans = loans.getAllLoans()
        res.status(200).json(alloans)
    },

    // GET /api/loans/:id
    show: (req, res) => {
        const { id } = req.params
        const showLoan = loans.getLoanById(id)
        if(!showLoan) throw new HttpError(404, 'Empréstimo não econtrado')
        
        return res.status(200).json(showLoan)
    },

    // POST /api/loans
    create: (req, res) => {
        const user = req.user
        const { bookId } = req.body
        
        if(typeof bookId !== 'string') throw new HttpError(400, 'ID de livro inválido')

        const book = books.getBookById(bookId)    
        if(!book) throw new HttpError(404, 'Livro não encontrado')

        const createdLoan = loans.createLoan(user, book)
        
        res.status(201).json(createdLoan)
    },

    //POST /api/loans/:id/return
    devolutive: (req, res) => {
        const { id } = req.params
        const devolutiveLoans = loans.returnLoan(id)
        if(!devolutiveLoans) throw new Error('Erro ao devolver o livro')

        res.status(200).json(devolutiveLoans)
    }
} 