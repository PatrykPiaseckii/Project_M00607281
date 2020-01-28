class UsersController {
  store({ body: { email, password } }, res) {
    res.send({ email, password })
  }
}

module.exports = UsersController
