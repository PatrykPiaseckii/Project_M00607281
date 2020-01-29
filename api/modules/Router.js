const AuthController = require('../controllers/AuthController')
const UsersController = require('../controllers/UsersController')
const CoursesController = require('../controllers/CoursesController')

class Router {
  constructor(expressRouter) {
    this.expressRouter = expressRouter

    this.setup = this.setup.bind(this)
  }

  setup(db) {
    const expressRouter = this.expressRouter({ caseSensitive: true })

    const authController = new AuthController(db)
    const usersController = new UsersController(db)
    const coursesController = new CoursesController(db)

    expressRouter.post('/login', authController.login)
    expressRouter.get('/users/:email', usersController.show)
    expressRouter.post('/users', usersController.store)
    expressRouter.get('/courses', coursesController.index)
    expressRouter.post('/courses', coursesController.store)
    expressRouter.get('/courses/:id', coursesController.show)
    expressRouter.patch('/courses/:id', coursesController.update)
    expressRouter.delete('/courses/:id', coursesController.destroy)

    return expressRouter
  }
}

module.exports = Router
