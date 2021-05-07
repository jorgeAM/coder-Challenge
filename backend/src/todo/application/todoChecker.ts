import { Service } from 'typedi'
import Todo from "../domain/todo";
import TodoId from "../domain/todoId";
import TodoRepository from "../domain/repository";
import TodoNotExist from "../domain/todoNotExist";

@Service()
class TodoChecker {
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

        const updatedTodo = new Todo(todo.id, todo.title, true, todo.createdAt)

        return this.repository.update(todoId, updatedTodo)
    }
}

export default TodoChecker