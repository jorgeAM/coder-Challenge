import TodoRepository from "../domain/repository";
import Todo from "../domain/todo";
import TodoId from "../domain/todoId";

class MongoTodoRepository implements TodoRepository {
    save(todo: Todo): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findById(id: TodoId): Promise<void | Todo> {
        throw new Error("Method not implemented.");
    }

    findAll(): Promise<Todo[]> {
        throw new Error("Method not implemented.");
    }

    update(id: TodoId, todo: Todo): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    remove(id: TodoId): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export default MongoTodoRepository