import mongoose from 'mongoose'

const { Schema } = mongoose

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  doneAt: Date
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
