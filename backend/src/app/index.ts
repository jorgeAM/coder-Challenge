import 'dotenv/config'
import 'reflect-metadata'
import { Router } from 'express'
import { Container } from 'typedi'
import debug, { Debugger } from 'debug'
import app from './app'
import { registerRoutes } from './todo/routes'
import MongoClientFactory from '../shared/infrastructure/persistence/mongoClientFactory'

const logger: Debugger = debug('api:index')

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

async function run() {
  const db = await MongoClientFactory.createClient(MONGO_URL!)
  
  Container.set('client.db', db)

  logger('we connected with mongoDB successfully 🍃')

  const router = Router()

  registerRoutes(router)

  app.use('/api/v1', router)

  app.listen(PORT, () => logger(`server is running on port ${PORT} 🚀`))
}

run().catch(err => logger('something got wrong: ', err))
