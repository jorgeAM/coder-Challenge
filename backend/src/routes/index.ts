import express, { Router } from 'express'
import todo from './todo'

const router: Router = express.Router()

router.use('/todo', todo)

export default router
