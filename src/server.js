require('dotenv').config()
const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const apiRouter = require('./routes/api')
const errorMiddleware = require('./middleware/error-middleware')

//configuracao para utilizar Json
app.use(express.json())

//configuracao de rota
app.use('/auth', authRouter)//Ex: rotas ficam em /auth/...
app.use('/api', apiRouter)//Ex: rotas ficam em /api/...

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running in http://localhost:${PORT}`))