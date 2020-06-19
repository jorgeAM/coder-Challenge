import debug from 'debug'
import Todo from '../models/todo'

const logger = debug('api:src:controllers:todo')

const create = async (req, res) => {
  const { title } = req.body

  try {
    const todo = await Todo.create({ title })

    return res.status(201).json({ todo })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const list = async (req, res) => {
  try {
    const query = {
      done: false
    }

    const todos = await Todo.find(query)

    return res.json({ todos })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const get = async (req, res) => {
  const { id } = req.params

  try {
    const todo = await Todo.findById(id)

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    return res.json({ todo })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const complete = async (req, res) => {
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
      return res.status(404).json({ message: 'Todo not found' })
    }

    return res.json({ todo })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const edit = async (req, res) => {
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
      return res.status(404).json({ message: 'Todo not found' })
    }

    return res.json({ todo })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    const query = {
      done: false,
      _id: id
    }

    const todo = await Todo.findOne(query)

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    await todo.remove()

    return res.json({ message: 'todo was successfully deleted' })
  } catch (error) {
    logger(error.message)
    return res.status(500).json({ message: 'something got wrong' })
  }
}

export { create, list, get, complete, edit, remove }
