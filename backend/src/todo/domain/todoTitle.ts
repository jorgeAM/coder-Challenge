class TodoTitle {
    readonly value: string

    constructor(value: string) {
        if (this.isEmpty(value)) {
            throw new Error('Invalid title')            
        }

        this.value = value
    }

    private isEmpty(value: string): boolean {
        if (value.length === 0) {
            return true
        }

        return false
    }
}

export default TodoTitle