require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')

//configuracao para utilizar Json
app.use(express.json())

//configuracao de rota
app.use('/api', routes)//Ex: rotas ficam em /api/...


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`))