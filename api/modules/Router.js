const UsersController = require('../controllers/UsersController')
const CoursesController = require('../controllers/CoursesController')

class Router {
  constructor(expressRouter) {
    this.expressRouter = expressRouter

    this.setup = this.setup.bind(this)
  }

  setup(db) {
    const expressRouter = this.expressRouter({ caseSensitive: true })

    const usersController = new UsersController(db)
    const coursesController = new CoursesController(db)

    expressRouter.get('/users/:email', usersController.show)
    expressRouter.post('/users', usersController.store)
    expressRouter.get('/courses', coursesController.index)

    return expressRouter
  }
}

module.exports = Router
