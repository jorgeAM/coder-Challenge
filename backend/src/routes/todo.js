import express from 'express'
import { create, list, get, complete, edit, remove } from '../controllers/todo'

const router = express.Router()

router.post('/', create)

router.get('/', list)

router.get('/:id', get)

router.put('/:id/complete', complete)

router.put('/:id', edit)

router.delete('/:id', remove)

export default router
