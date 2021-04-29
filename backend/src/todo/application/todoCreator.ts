import TodoRepository from "../domain/repository";
import Todo from "../domain/todo";
import TodoId from "../domain/todoId";
import TodoTitle from "../domain/todoTitle";

type Params = {
    id: string
    title: string
}

class TodoCreator {
    private repository: TodoRepository

    constructor(repository: TodoRepository) {
        this.repository = repository
    }

    run(params: Params): Promise<void> {
        const todo = new Todo(
            new TodoId(params.id),
            new TodoTitle(params.title),
            true,
            new Date()
        )

        return this.repository.save(todo)
    }
}

export default TodoCreator