const jwt = require('jsonwebtoken')
const users = require('../model/users')
module.exports = {
    ensureAuth: (req, res, next) => {
        const authHeader = req.headers.authorization

        if(!authHeader) {
            return res.status(401).json({ message: 'Não Autorizado'})
        }

        const token = authHeader.split(' ')[1]

        try {
            const { id } = jwt.verify(token, process.env.JWT_KEY)
            const user = users.getuserById(id)

            if(!user) {
                return res.status(404).json({ message: 'Usiário Não Enconrado'})
            }

            req.user = user
            next()
        } catch (error) {
            return res.status(401).json({ message: 'Token Invalido'})
        }
    }
}