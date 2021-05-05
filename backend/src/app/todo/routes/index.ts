import glob from 'glob'
import { Router } from 'express'
import { register as registerTodoRoutes } from './todo.routes'
import TodoRepository from '../../../todo/domain/repository'

export function registerRoutes(router: Router, repository: TodoRepository): void {
    const routes = glob.sync('./*.routes.*')

    registerTodoRoutes(router, repository)
}
