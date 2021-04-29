import { MongoRepository } from "../../shared/infrastructure/persistence/mongoRepository";
import TodoRepository from "../domain/repository";
import Todo from "../domain/todo";
import TodoId from "../domain/todoId";

class MongoTodoRepository extends MongoRepository implements TodoRepository {
    async save(todo: Todo): Promise<void> {
        const collection = await this.getCollection()
        collection.insertOne(todo.toPrimitive())
    }
    
    async findById(id: TodoId): Promise<null | Todo> {
        const collection = await this.getCollection()

        const query = {
            _id: id.value
        }

        const doc = await collection.findOne(query)

        return doc ? Todo.fromPrimitive(doc) : null
    }
    
    async findAll(): Promise<Todo[]> {
        const collection = await this.getCollection()

        const cursor = collection.find()

        const todos: Array<Todo> = []

        while (await cursor.hasNext()) {
            const doc = await cursor.next()
            todos.push(Todo.fromPrimitive(doc))
        }

        return todos
    }
    
    async update(id: TodoId, todo: Todo): Promise<void> {
        const collection = await this.getCollection()

        const query = {
            _id: id.value
        }


        const doc = todo.toPrimitive()

        const updateDoc = {
            $set: {
               ...doc
            },
         };


        collection.updateOne(query, updateDoc)
    }
    
    async remove(id: TodoId): Promise<void> {
        const collection = await this.getCollection()

        const query = {
            _id: id.value
        }

        collection.deleteOne(query)
    }
    
    protected getCollectionName(): string {
        return 'todos'
    }
}

export default MongoTodoRepository