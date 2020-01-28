class UsersController {
  constructor(db) {
    this.db = db

    this.show = this.show.bind(this)
    this.store = this.store.bind(this)
  }

  async show({ params: { email } }, res) {
    const collection = this.db.collection('users')

    const user = await collection.findOne({
      email: { $eq: email },
    })

    if (!user) {
      res.status(404).send({ errors: ['User not found'] })
      return
    }

    res.status(200).send(this._format(user))
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
