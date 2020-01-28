const UsersController = require('../controllers/UsersController')

class Router {
  constructor(expressRouter) {
    this.expressRouter = expressRouter

    this.setup = this.setup.bind(this)
  }

  setup(db) {
    const expressRouter = this.expressRouter({ caseSensitive: true })

    const usersController = new UsersController(db)

    expressRouter.get('/users/:email', usersController.show)
    expressRouter.post('/users', usersController.store)

    return expressRouter
  }
}

module.exports = Router
