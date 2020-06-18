import cors from 'cors'
import express from 'express'
import router from './routes'

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/v1', router)

export default app
