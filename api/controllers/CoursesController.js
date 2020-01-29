const { ObjectId } = require('mongodb')

class CoursesController {
  constructor(db) {
    this.db = db

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
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
}

module.exports = CoursesController
