import { ObjectID } from 'mongodb'

class TodoId {
    readonly value: string

    constructor(value: string) {
        if (!this.isValid(value)) {
            throw new Error('Invalid id')            
        }

        this.value = value
    }

    static random(): ObjectID {
        return new ObjectID()
    }

    private isValid(value: string | ObjectID): boolean {
        return ObjectID.isValid(value)
    }
}

export default TodoId