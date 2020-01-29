class CoursesController {
  constructor(db) {
    this.db = db

    this.index = this.index.bind(this)
  }

  async index(req, res) {
    const collection = this.db.collection('courses')

    const courses = await collection.find().toArray()

    res.status(200).send(courses)
  }
}

module.exports = CoursesController
