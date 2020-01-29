const DATABASE_URL = 'mongodb://root:password@localhost:27017'
const DATABASE_NAME = 'app'
const CERTIFICATE_PATH = '@todo'

const fs = require('fs')
const cors = require('cors')
const http = require('http')
const https = require('https')
const express = require('express')
const { MongoClient } = require('mongodb')
const Router = require('./modules/Router')
const Auth = require('./modules/Auth')

const privateKey = fs.readFileSync(`${CERTIFICATE_PATH}/localhost.key`, 'utf8')
const certificate = fs.readFileSync(`${CERTIFICATE_PATH}/localhost.cert`, 'utf8')

const app = express()
const router = new Router(express.Router)
const auth = new Auth()

const main = async () => {
  const mongoClient = new MongoClient(DATABASE_URL, { useUnifiedTopology: true })
  await mongoClient.connect()
  const db = mongoClient.db(DATABASE_NAME)

  app.use(cors())
  app.use(express.json())
  app.use('/api', router.setup(db, auth))

  const httpServer = http.createServer(app)
  const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app)

  httpServer.listen(3000)
  httpsServer.listen(8443)
}

main()
