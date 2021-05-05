import { Request, Response, Router } from 'express'
import TodoChecker from '../../../todo/application/todoChecker'
import TodoCleaner from '../../../todo/application/todoCleaner'
import TodoCreator from '../../../todo/application/todoCreator'
import TodoFinder from '../../../todo/application/todoFinder'
import TodoReader from '../../../todo/application/todoReader'
import TodoUpdater from '../../../todo/application/todoUpdater'
import TodoRepository from '../../../todo/domain/repository'
import CompleteTodoController from '../controllers/complete'
import CreateTodoController from '../controllers/create'
import FindTodoController from '../controllers/finder'
import ReadTodoController from '../controllers/read'
import CleanTodoController from '../controllers/remove'
import UpdateTodoController from '../controllers/update'

export const register = (router: Router, repository: TodoRepository) => {
    const todoChecker = new TodoChecker(repository)
    const todoCleaner = new TodoCleaner(repository)
    const todoCreator = new TodoCreator(repository)
    const todoFinder = new TodoFinder(repository)
    const todoReader = new TodoReader(repository)
    const todoUpdater = new TodoUpdater(repository)

    const completeTodoController = new CompleteTodoController(todoChecker)
    const createTodoController = new CreateTodoController(todoCreator)
    const findTodoController = new FindTodoController(todoFinder)
    const readTodoController = new ReadTodoController(todoReader)
    const cleanTodoController = new CleanTodoController(todoCleaner)
    const updateTodoController = new UpdateTodoController(todoUpdater)

    router.post('/todos', (req: Request, res: Response) => createTodoController.run(req, res))
    router.get('/todos', (req: Request, res: Response) => readTodoController.run(req, res))
    router.get('/todos/:id', (req: Request, res: Response) => findTodoController.run(req, res))
    router.put('/todos/:id/complete', (req: Request, res: Response) => completeTodoController.run(req, res))
    router.put('/todos/:id', (req: Request, res: Response) => updateTodoController.run(req, res))
    router.delete('/todos/:id', (req: Request, res: Response) => cleanTodoController.run(req, res))
}
