import cors from 'cors'
import express, { Application } from 'express'
import { registerRoutes } from './todo/routes'

const app: Application = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

export default app
