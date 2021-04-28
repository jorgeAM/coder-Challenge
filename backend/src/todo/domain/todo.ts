import TodoId from "./todoId"
import TodoTitle from "./todoTitle"

class Todo {
    readonly id: TodoId
    readonly title: TodoTitle
    readonly done: boolean
    readonly createdAt: Date
    
    constructor(id: TodoId, title: TodoTitle, done: boolean, createdAt: Date) {
        this.id = id
        this.title = title
        this.done = done
        this.createdAt = createdAt
    }

    toPrimitive() {
        return {
            id: this.id.value,
            title: this.title.value,
            done: this.done,
            createdAt: this.createdAt
        }
    }
}

export default Todo