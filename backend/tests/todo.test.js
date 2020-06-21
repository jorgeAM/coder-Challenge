import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'
import Todo from '../src/models/todo'

const req = request(app)
const baseUrl = '/api/v1/todo'

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

afterAll(async () => {
  await Todo.deleteMany()
})

describe('TODO endpoints', () => {
  test('create todo', async () => {
    const payload = {
      title: 'take a shower'
    }

    const res = await req.post(baseUrl).send(payload)

    const expected = {
      title: payload.title,
      done: false
    }

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('todo')
    expect(res.body.todo).toMatchObject(expected)
  })

  test('list all todos', async () => {
    const res = await req.get(baseUrl)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('todos')
  })
})
