const uuid = require('uuid').v4

const users = [
    { 
        id: '1',
        name: 'admin',
        email: 'admin@admin.com.br',
        password: '123456',
    },

    {
        id: '2',
        name: 'gustavo',
        email:'gustavo@gmail.com',
        password: '123456'
    }
]

module.exports = {
    //function para selecionar usuarios pelo id
    getuserById: (id) => users.find((user) => user.id === id),

    //function para selecionar todos os usuarios
    getAllUsers: () => users,

    //function para selecionar usuario pelo email
    getUsersByEmail: (email) => users.find((user) => user.email === email),

    //function para criar usuario
    createUser: (name, email, password) => {
        const newUser = {
            id: uuid(),
            name: name,
            email: email,
            password: password
        }
        users.push(newUser)
        return newUser
    } 
}