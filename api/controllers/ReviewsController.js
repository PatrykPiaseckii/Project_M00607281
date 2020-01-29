const { ObjectId } = require('mongodb')

class ReviewsController {
  constructor(db) {
    this.db = db

    this.store = this.store.bind(this)
    this.update = this.update.bind(this)
  }

  async store({ user, params: { courseId }, body: { review } }, res) {
    const collection = this.db.collection('courses')

    const course = await collection.findOne({ _id: ObjectId(courseId) })
    const result = await collection.findOneAndUpdate(
      {
        _id: { $eq: ObjectId(courseId) },
      },
      {
        $set: {
          reviews: [
            ...course.reviews,
            {
              user_id: user._id,
              review,
            },
          ],
        },
      }
    )

    if (!result.ok) {
      res.status(500).send({ errors: ['An internal error occurred'] })
      return
    }

    res.sendStatus(200)
  }

  async update({ user, params: { courseId }, body: { review } }, res) {
    const collection = this.db.collection('courses')

    const course = await collection.findOne({ _id: ObjectId(courseId) })
    const result = await collection.findOneAndUpdate(
      {
        _id: { $eq: ObjectId(courseId) },
      },
      {
        $set: {
          reviews: course.reviews.map(r => (r.user_id === user._id ? { ...r, review } : r)),
        },
      }
    )

    if (!result.ok) {
      res.status(500).send({ errors: ['An internal error occurred'] })
      return
    }

    res.sendStatus(200)
  }
}

module.exports = ReviewsController
