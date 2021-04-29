class TodoNotExist extends Error {
	constructor(id: string) {
		super(`Todo with id ${id} does not exists`);
    }
}

export default TodoNotExist