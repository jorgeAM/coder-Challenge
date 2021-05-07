import { Service, Inject } from 'typedi'
import TodoRepository from "../domain/repository";
import MongoTodoRepository from '../infrastructure/persistence/mongoTodoRepository';

type Response = {
    id: string
    title: string
    done: boolean
    createdAt: Date
}

@Service()
class TodoReader {
    private readonly repository: TodoRepository

    constructor(@Inject(() => MongoTodoRepository) repository: TodoRepository) {
        this.repository = repository
    }

    async run(): Promise<Array<Response>> {
        const todos = await this.repository.findAll()

        let todosResponse: Array<Response> = []

        todos.forEach(todo => {
            todosResponse.push(todo.toPrimitive())
        })

        return todosResponse
    }
}

export default TodoReader