import TodoRepository from "../domain/repository";
import Todo from "../domain/todo";
import TodoId from "../domain/todoId";
import TodoNotExist from "../domain/todoNotExist";
import TodoTitle from "../domain/todoTitle";

class TodoUpdater {
    private repository: TodoRepository

    constructor(repository: TodoRepository) {
        this.repository = repository
    }

    async run(id: string, title: string): Promise<void> {
        const todoId = new TodoId(id)

        const todo = await this.repository.findById(todoId)

        if (!todo) {
            throw new TodoNotExist(todoId.value)
        }

        const todoTitle = new TodoTitle(title)

        const updatedTodo = new Todo(todo.id, todoTitle, todo.done, todo.createdAt)

        return this.repository.update(todoId, updatedTodo)
    }
}

export default TodoUpdater