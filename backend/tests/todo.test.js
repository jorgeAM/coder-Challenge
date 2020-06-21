import request from 'supertest'
import mongoose from 'mongoose'
import app from '../src/app'
import Todo from '../src/models/todo'

const req = request(app)
const baseUrl = '/api/v1/todo'

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

afterAll(async done => {
  await Todo.deleteMany()
  await mongoose.connection.close()
  done()
})

describe('TODO endpoints', () => {
  test('create TODO should fail if body is invalid', async () => {
    const payload = {}
    const res = await req.post(baseUrl).send(payload)

    const expected = {
      message: 'something got wrong'
    }

    expect(res.status).toBe(500)
    expect(res.body).toMatchObject(expected)
  })

  test('create TODO', async () => {
    const payload = {
      title: 'Help u with your challenge'
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

  test('list all TODO', async () => {
    const res = await req.get(baseUrl)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('todos')
  })

  test('complete TODO should fail if todo does not exist', async () => {
    const id = '507f1f77bcf86cd799439011'
    const res = await req.put(`${baseUrl}/${id}/complete`)

    const expected = {
      message: 'TODO not found'
    }

    expect(res.status).toBe(404)
    expect(res.body).toMatchObject(expected)
  })

  test('complete TODO should fail if request is wrong', async () => {
    const res = await req.put(`${baseUrl}/someId/complete`)

    const expected = {
      message: 'something got wrong'
    }

    expect(res.status).toBe(500)
    expect(res.body).toMatchObject(expected)
  })

  test('complete TODO', async () => {
    const payload = {
      title: 'take a shower'
    }

    const postRes = await req.post(baseUrl).send(payload)

    expect(postRes.status).toBe(201)

    const id = postRes.body.todo._id

    const res = await req.put(`${baseUrl}/${id}/complete`)

    const expected = {
      _id: id,
      title: payload.title,
      done: true
    }

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('todo')
    expect(res.body.todo).toMatchObject(expected)
  })

  test('edit TODO should fail if todo does not exist', async () => {
    const id = '507f1f77bcf86cd799439011'
    const res = await req.put(`${baseUrl}/${id}`)

    const expected = {
      message: 'TODO not found'
    }

    expect(res.status).toBe(404)
    expect(res.body).toMatchObject(expected)
  })

  test('edit TODO should fail if request is wrong', async () => {
    const res = await req.put(`${baseUrl}/someId`)

    const expected = {
      message: 'something got wrong'
    }

    expect(res.status).toBe(500)
    expect(res.body).toMatchObject(expected)
  })

  test('edit TODO', async () => {
    const payload = {
      title: 'take a shower'
    }

    const postRes = await req.post(baseUrl).send(payload)

    expect(postRes.status).toBe(201)

    const id = postRes.body.todo._id

    payload.title = 'take a shower tonigth'

    const res = await req.put(`${baseUrl}/${id}`).send(payload)

    const expected = {
      _id: id,
      title: payload.title,
      done: false
    }

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('todo')
    expect(res.body.todo).toMatchObject(expected)
  })

  test('delete TODO should fail if todo does not exist', async () => {
    const id = '507f1f77bcf86cd799439011'
    const res = await req.delete(`${baseUrl}/${id}`)

    const expected = {
      message: 'TODO not found'
    }

    expect(res.status).toBe(404)
    expect(res.body).toMatchObject(expected)
  })

  test('delete TODO should fail if request is wrong', async () => {
    const res = await req.delete(`${baseUrl}/someId`)

    const expected = {
      message: 'something got wrong'
    }

    expect(res.status).toBe(500)
    expect(res.body).toMatchObject(expected)
  })

  test('delete TODO', async () => {
    const payload = {
      title: 'take a shower'
    }

    const postRes = await req.post(baseUrl).send(payload)

    expect(postRes.status).toBe(201)

    const id = postRes.body.todo._id

    const res = await req.delete(`${baseUrl}/${id}`)

    const expected = {
      message: 'TODO was successfully deleted'
    }

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(expected)
  })
})
