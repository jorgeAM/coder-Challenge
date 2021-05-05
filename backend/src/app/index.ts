import 'dotenv/config'
import { Router } from 'express'
import debug, { Debugger } from 'debug'
import { MongoClient } from 'mongodb'
import app from './app'
import MongoTodoRepository from '../todo/infrastructure/persistence/mongoTodoRepository'
import { registerRoutes } from './todo/routes'

const logger: Debugger = debug('api:index')

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const client = new MongoClient(MONGO_URL!, { useNewUrlParser: true, useUnifiedTopology: true})

const mongoTodoRepository = new MongoTodoRepository(client)

async function run() {
  await client.connect()

  logger('we connected with mongoDB successfully 🍃')

  const router = Router()

  registerRoutes(router, mongoTodoRepository)

  app.use('/api/v1', router)

  app.listen(PORT, () => logger(`server is running on port ${PORT} 🚀`))
}

run().catch(err => logger('something got wrong: ', err))
