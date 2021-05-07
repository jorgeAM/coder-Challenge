import { Service } from 'typedi'
import { Request, Response } from "express";
import TodoUpdater from "../../../todo/application/todoUpdater";
import Controller from "./controller";

type UpdateTodoParams = {
    id: string
}

type UpdateTodoRequest = {
    title: string
}

@Service()
class UpdateTodoController implements Controller {
    constructor(private updater: TodoUpdater) { }
    
    async run(req: Request, res: Response): Promise<void> {
        const params = req.params as UpdateTodoParams
        const body = req.body as UpdateTodoRequest

        try {
            await this.updater.run(params.id, body.title)

            res.status(201).json({ message: `todo with id ${params.id} was updated` })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default UpdateTodoController