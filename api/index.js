const DATABASE_URL = 'mongodb://root:password@localhost:27017'
const DATABASE_NAME = 'app'

const express = require('express')
const { MongoClient } = require('mongodb')
const Router = require('./modules/Router.js')

const app = express()
const router = new Router(express.Router)

const main = async () => {
  const mongoClient = new MongoClient(DATABASE_URL, { useUnifiedTopology: true })
  await mongoClient.connect()
  const db = mongoClient.db(DATABASE_NAME)

  app.use(express.json())
  app.use('/api', router.setup(db))

  app.listen(3000, () => console.log('Started server at http://localhost:3000'))
}

main()
