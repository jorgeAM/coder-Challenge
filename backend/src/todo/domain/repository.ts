import Todo from "./todo";
import TodoId from "./todoId";

interface TodoRepository {
    save(todo: Todo): Promise<void>
    findById(id: TodoId): Promise<Todo | null>
    findAll(): Promise<Todo[]>
    update(id: TodoId, todo: Todo): Promise<void>
    remove(id: TodoId): Promise<void>
}

export default TodoRepository