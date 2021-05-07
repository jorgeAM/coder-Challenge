import { Service } from 'typedi'
import TodoId from "../domain/todoId";
import TodoRepository from "../domain/repository";
import TodoNotExist from "../domain/todoNotExist";

@Service()
class TodoCleaner {
    private repository: TodoRepository

    constructor(repository: TodoRepository) {
        this.repository = repository
    }

    async run(id: string): Promise<void> {
        const todoId = new TodoId(id)

        const todo = await this.repository.findById(todoId)

        if (!todo) {
            throw new TodoNotExist(todoId.value)
        }

        return this.repository.remove(todoId)
    }
}

export default TodoCleaner