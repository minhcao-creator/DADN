require('dotenv').config()
const express = require('express')

const database = require('./config/database/index')
database.connect()

const app = express()
const PORT = 5000

var cors = require('cors')
app.use(cors())
app.use(express.json())

const userRouter = require('./routes/user')
const systemRouter = require('./routes/system')
const historyRouter = require('./routes/history')

// const emailAccounts = require('./controllers/mailerController')
// emailAccounts.mailer()

app.use('/status', systemRouter)
app.use('/history', historyRouter)
app.use('/', userRouter)

app.listen(PORT, () => {
    console.log('System started')
})