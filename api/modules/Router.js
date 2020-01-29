const AuthController = require('../controllers/AuthController')
const UsersController = require('../controllers/UsersController')
const CoursesController = require('../controllers/CoursesController')
const ReviewsController = require('../controllers/ReviewsController')

class Router {
  constructor(expressRouter) {
    this.expressRouter = expressRouter

    this.setup = this.setup.bind(this)
  }

  setup(db, auth) {
    const expressRouter = this.expressRouter({ caseSensitive: true })

    expressRouter.use(auth.middleware())

    const authController = new AuthController(db, auth)
    const usersController = new UsersController(db)
    const coursesController = new CoursesController(db)
    const reviewsController = new ReviewsController(db)

    expressRouter.post('/login', authController.login)
    expressRouter.get('/users/:email', usersController.show)
    expressRouter.post('/users', usersController.store)
    expressRouter.get('/courses', coursesController.index)
    expressRouter.post('/courses', coursesController.store)
    expressRouter.get('/courses/:id', coursesController.show)
    expressRouter.patch('/courses/:id', coursesController.update)
    expressRouter.delete('/courses/:id', coursesController.destroy)
    expressRouter.post('/courses/:courseId/reviews', reviewsController.store)
    expressRouter.patch('/courses/:courseId/reviews', reviewsController.update)

    return expressRouter
  }
}

module.exports = Router
