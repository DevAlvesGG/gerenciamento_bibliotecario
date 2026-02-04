const users = require('../model/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


module.exports = {
    //POST /auth/register
    register: (req, res) => {
        const { name, email, password } = req.body //pego as informações do body da requisição

        //faço uma pequena validação, retorno erro se não for string
        if(typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios'})
        }

        //faço uma pequena validação se o usuario existe, caso sim, retorno erro
        const existUser = users.getUsersByEmail(email) 
        if(existUser){
            return res.status(400).json({ message: 'Usuario ja cadastrado'})
        }

        //caso passe das validações, crio e retorno um json contendo o usuario criado
        const newUser = users.createUser(name, email, password)
        return res.status(201).json({...newUser, password: undefined})

    },

    //POST /auth/login
    login: (req, res) => {
        const { email, password } = req.body;

        //faço uma pequena validação, retorno erro se não for string
        if(typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios'})
        }

        //faço uma pequena validação se o usuario existe, caso nao, retorno erro
        const existUser = users.getUsersByEmail(email) 
        if(!existUser){
            return res.status(400).json({ message: 'Usuario não cadastrado'})
        }

        //faço uma validação para saber se a senha é valida
        const isValidPassword = bcrypt.compareSync(password, existUser.password)
        if(!isValidPassword){
            return res.status(400).json({ message: 'Usuário ou Senha Inválido'})
        }
        
        const payload = { id: existUser.id, email: existUser.email}
        const token = jwt.sign( payload, process.env.JWT_KEY, {expiresIn:'1d'})
        res.json(token)
    }
}