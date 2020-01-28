const express = require('express')
const app = express()
const router = express.Router({ caseSensitive: true })

const UsersController = require('./controllers/UsersController')

const usersController = new UsersController()

router.post('/users', usersController.store)

app.use(express.json())
app.use('/api', router)

app.listen(3000, () => console.log('Started server at http://localhost:3000'))
