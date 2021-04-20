import cors from 'cors'
import express, { Application } from 'express'
import router from './routes'

const app: Application = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/v1', router)

export default app
