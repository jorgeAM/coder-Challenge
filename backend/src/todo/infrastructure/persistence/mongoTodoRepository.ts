import { Service } from 'typedi'
import Todo from "../../domain/todo";
import TodoId from "../../domain/todoId";
import TodoRepository from "../../domain/repository";
import { MongoRepository } from "../../../shared/infrastructure/persistence/mongoRepository";

@Service()
class MongoTodoRepository extends MongoRepository implements TodoRepository {
    async save(todo: Todo): Promise<void> {
        const collection = await this.getCollection()
        collection.insertOne(todo.toPrimitive())
    }
    
    async findById(id: TodoId): Promise<null | Todo> {
        const collection = await this.getCollection()

        const query = {
            _id: id.getObjectId()
        }

        const doc = await collection.findOne(query)

        return doc ? Todo.fromPrimitive(doc) : null
    }
    
    async findAll(): Promise<Todo[]> {
        const collection = await this.getCollection()

        const cursor = await collection.find()

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
            _id: id.getObjectId()
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
            _id: id.getObjectId()
        }

        collection.deleteOne(query)
    }
    
    protected getCollectionName(): string {
        return 'todos'
    }
}

export default MongoTodoRepository