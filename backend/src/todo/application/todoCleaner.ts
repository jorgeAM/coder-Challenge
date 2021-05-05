import TodoRepository from "../domain/repository";
import TodoId from "../domain/todoId";
import TodoNotExist from "../domain/todoNotExist";

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