class AuthController {
  constructor(db, auth) {
    this.db = db
    this.auth = auth

    this.login = this.login.bind(this)
  }

  async login({ body: { email, password } }, res) {
    const collection = this.db.collection('users')

    const user = await collection.findOne({
      email: { $eq: email },
    })

    if (!user) {
      res.status(404).send({ errors: ['User not found'] })
      return
    }

    if (user.password !== password) {
      res.status(403).send({ errors: ['The password is incorrect'] })
      return
    }

    const token = this.auth.sign(user)

    res.status(200).send({
      ...this._format(user),
      token,
    })
  }

  _format({ _id, email, type }) {
    return { _id, email, type }
  }
}

module.exports = AuthController
