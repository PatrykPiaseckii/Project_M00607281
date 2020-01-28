class UsersController {
  constructor(db) {
    this.db = db

    this.store = this.store.bind(this)
  }

  async store({ body: { email, password } }, res) {
    const collection = this.db.collection('users')

    const user = { email, password, type: 'student' }
    const { result } = await collection.insertOne(user)

    if (!result.ok) {
      res.status(500).send({ errors: ['An internal error occurred'] })
      return
    }

    res.status(201).send(this._format(user))
  }

  _format({ _id, email, type }) {
    return { _id, email, type }
  }
}

module.exports = UsersController
