const UsersController = require('../controllers/UsersController')

class Router {
  constructor(expressRouter) {
    this.expressRouter = expressRouter
  }

  setup() {
    const expressRouter = this.expressRouter({ caseSensitive: true })

    const usersController = new UsersController()

    expressRouter.post('/users', usersController.store)

    return expressRouter
  }
}

module.exports = Router
