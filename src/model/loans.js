const uuid = require('uuid').v4
const books = require('./books')

const loans = [
    {
        id: uuid(),
        userId: uuid(),
        bookId:  uuid(),
        loanDate: new Date('2026-02-05'),
        returnDate: null,
        isReturned: false,
        isLate: true
    },
]

module.exports = {
    getAllLoans: () => loans,

    getLoanById: (id) => loans.find((loan) => loan.id === id),

    createLoan: (user, book) => {
        if(book.quantity < 1) throw new HttpError(400, 'Não há exemplares disponiveis no momento')

        const today = new Date()
        const returnDate = new Date
        returnDate.setDate(today.getDate() + 14)

        const newLoan = {
            id: uuid(),
            userId: user.id,
            bookId: book.id,
            loanDate: today,
            returnDate: returnDate,
            isReturned: false,
            isLate: false
        }
        loans.push(newLoan)
        books.takeBooktoLoan(book.id)
        return newLoan
    },

    returnLoan: (id) => {
        const loanIndex = loans.findIndex((loan) => loan.id === id)
        if(loanIndex === -1) throw new HttpError(404, 'Empréstimo não encontrado')

        const loan = loans[loanIndex]
        if(loan.isReturned) return null

        loan.isReturned = true

        const today = new Date()
        const limitDate = new Date(loan.returnDate)
        loan.isLate = today > limitDate
        loan.returnDate = today

        books.devolutiveLoan(loan.book.id)
        return loan

    }
}