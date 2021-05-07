import { Service } from 'typedi'
import { Request, Response } from "express";
import TodoCreator from "../../../todo/application/todoCreator";
import TodoId from "../../../todo/domain/todoId";
import Controller from "./controller";

type CreateTodoRequest = {
    title: string
}

@Service()
class CreateTodoController implements Controller {
    constructor(private creator: TodoCreator) { }
    
    async run(req: Request, res: Response): Promise<void> {
        const body = req.body as CreateTodoRequest

        const params = {
            id: TodoId.random().toHexString(),
            title: body.title
        }

        try {
            await this.creator.run(params)

            res.status(201).json({ message: 'todo created successfully'})  
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default CreateTodoController