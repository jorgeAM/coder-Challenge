import 'dotenv/config'
import debug from 'debug'
import mongoose from 'mongoose'
import app from './app'

const logger = debug('api:index')

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL!, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  logger('we connected with mongoDB successfully 🍃')
  app.listen(PORT, () => logger(`server is running on port ${PORT} 🚀`))
})
