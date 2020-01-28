const express = require('express')
const Router = require('./modules/Router.js')

const app = express()
const router = new Router(express.Router)

app.use(express.json())
app.use('/api', router.setup())

app.listen(3000, () => console.log('Started server at http://localhost:3000'))
