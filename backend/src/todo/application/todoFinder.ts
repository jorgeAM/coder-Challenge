import TodoRepository from "../domain/repository";
import TodoId from "../domain/todoId";
import TodoNotExist from "../domain/todoNotExist";

type Response = {
    id: string
    title: string
    done: boolean
    createdAt: Date
}

class TodoFinder {
    private repository: TodoRepository

    constructor(repository: TodoRepository) {
        this.repository = repository
    }

    async run(id: string): Promise<Response> {
        const todoId = new TodoId(id)

        const todo = await this.repository.findById(todoId)

        if (!todo) {
            throw new TodoNotExist(todoId.value)
        }

        return todo.toPrimitive() as Response
    }
}

export default TodoFinder