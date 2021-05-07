import { Request, Response, Router } from 'express'
import { Container } from 'typedi'
import CompleteTodoController from '../controllers/complete'
import CreateTodoController from '../controllers/create'
import FindTodoController from '../controllers/finder'
import ReadTodoController from '../controllers/read'
import CleanTodoController from '../controllers/remove'
import UpdateTodoController from '../controllers/update'

export const register = (router: Router) => {

    const completeTodoController = Container.get(CompleteTodoController)
    const createTodoController = Container.get(CreateTodoController)
    const findTodoController = Container.get(FindTodoController)
    const readTodoController = Container.get(ReadTodoController)
    const cleanTodoController = Container.get(CleanTodoController)
    const updateTodoController = Container.get(UpdateTodoController)

    router.post('/todos', (req: Request, res: Response) => createTodoController.run(req, res))
    router.get('/todos', (req: Request, res: Response) => readTodoController.run(req, res))
    router.get('/todos/:id', (req: Request, res: Response) => findTodoController.run(req, res))
    router.put('/todos/:id/complete', (req: Request, res: Response) => completeTodoController.run(req, res))
    router.put('/todos/:id', (req: Request, res: Response) => updateTodoController.run(req, res))
    router.delete('/todos/:id', (req: Request, res: Response) => cleanTodoController.run(req, res))
}
