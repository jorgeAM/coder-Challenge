import TodoRepository from "../domain/repository";
import TodoId from "../domain/todoId";
import TodoNotExist from "../domain/todoNotExist";

type Response = {
    id: string
    title: string
    done: boolean
    createdAt: Date
}

class TodoReader {
    private repository: TodoRepository

    constructor(repository: TodoRepository) {
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