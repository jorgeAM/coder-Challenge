import cors from 'cors'
import express from 'express'

let app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

export default app
