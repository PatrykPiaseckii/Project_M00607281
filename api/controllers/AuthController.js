const jwt = require('jsonwebtoken')

class AuthController {
  constructor(db) {
    this.db = db

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

    const token = jwt.sign(this._format(user), '3287d53e-53b7-4302-aa40-e2bf25c2b294')

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
