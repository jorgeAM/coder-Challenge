import express from 'express'

const router = express.Router()

router.post('/', async (req, res) => {
  res.json({ message: 'cear' })
})

router.get('/', async (req, res) => {
  res.json({ message: 'listar' })
})

router.get('/:id', async (req, res) => {
  res.json({ message: 'ver 1' })
})

router.put('/:id/complete', async (req, res) => {
  res.json({ message: 'completar' })
})

router.put('/:id', async (req, res) => {
  res.json({ message: 'editar' })
})

router.delete('/:id', async (req, res) => {
  res.json({ message: 'eliminar' })
})

export default router
