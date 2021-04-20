import {Request, Response} from 'express'
import debug from 'debug'
import Todo from '../models/todo'
import CreateRequest from './createRequest'

const logger = debug('api:src:controllers:todo')

const create = async (req: Request, res: Response) => {
  const { title } = req.body as CreateRequest

  try {
    const todo = await Todo.create({ title })

    return res.status(201).json({ todo })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const list = async (req: Request, res: Response) => {
  try {
    const query = {
      done: false
    }

    const todos = await Todo.find(query).lean()

    return res.json({ todos })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const complete = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const query = {
      done: false,
      _id: id
    }

    const payload = { done: true }

    const opts = { new: true }

    const todo = await Todo.findOneAndUpdate(query, payload, opts)

    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' })
    }

    return res.json({ todo })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const edit = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title } = req.body

  try {
    const query = {
      done: false,
      _id: id
    }

    const payload = { title }

    const opts = { new: true }

    const todo = await Todo.findOneAndUpdate(query, payload, opts)

    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' })
    }

    return res.json({ todo })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const query = {
      done: false,
      _id: id
    }

    const todo = await Todo.findOne(query)

    if (!todo) {
      return res.status(404).json({ message: 'TODO not found' })
    }

    await todo.remove()

    return res.json({ message: 'TODO was successfully deleted' })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

export { create, list, complete, edit, remove }
