const { ObjectId } = require('mongodb')

class CoursesController {
  constructor(db) {
    this.db = db

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.store = this.store.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  async index(req, res) {
    const collection = this.db.collection('courses')

    const courses = await collection.find().toArray()

    res.status(200).send(courses)
  }

  async show({ params: { id } }, res) {
    const collection = this.db.collection('courses')

    const course = await collection.findOne({
      _id: { $eq: ObjectId(id) },
    })

    if (!course) {
      res.status(404).send({ errors: ['Course not found'] })
      return
    }

    res.status(200).send(course)
  }

  async store({ body: { title, topic, price, location, time, length } }, res) {
    const author = {
      name: 'Jane Doe',
      email: 'jane@example.com',
    }
    const collection = this.db.collection('courses')

    const course = {
      title,
      author,
      topic,
      price,
      reviews: [],
      location,
      time,
      length,
    }
    const { result } = await collection.insertOne(course)

    if (!result.ok) {
      res.status(500).send({ errors: ['An internal error occurred'] })
      return
    }

    res.status(201).send(course)
  }

  async destroy({ params: { id } }, res) {
    const collection = this.db.collection('courses')

    await collection.deleteOne({
      _id: { $eq: ObjectId(id) },
    })

    res.sendStatus(200)
  }
}

module.exports = CoursesController
