const create = async (req, res) => {
  res.json({ message: 'cear' })
}

const list = async (req, res) => {
  res.json({ message: 'list' })
}

const get = async (req, res) => {
  res.json({ message: 'ver' })
}

const complete = async (req, res) => {
  res.json({ message: 'completar' })
}

const edit = async (req, res) => {
  res.json({ message: 'editar' })
}

const remove = async (req, res) => {
  res.json({ message: 'eliminar' })
}

export { create, list, get, complete, edit, remove }
