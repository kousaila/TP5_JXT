const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()

const usersRouter = require('./routes/users-v1')
const usersModel = require('./model/users')

const authRouter = require('./routes/auth-v1')
const loggerModel = require('./model/auth')
const authing = loggerModel(usersModel)




app.use(bodyParser.json())

// Activation de Helmet
app.use(helmet({noSniff: true}))

// On injecte le model dans les routers. Ceci permet de supprimer la dépendance
// directe entre les routers et le modele

app.use('/v1/users', usersRouter(usersModel))
app.use('/v1/auth', authRouter(usersModel, authing))

// For unit tests
exports.app = app