import { Service } from 'typedi'
import { Request, Response } from "express";
import TodoCleaner from "../../../todo/application/todoCleaner";
import Controller from "./controller";

type CleanTodoParams = {
    id: string
}

@Service()
class CleanTodoController implements Controller {
    constructor(private cleaner: TodoCleaner) { }
    
    async run(req: Request, res: Response): Promise<void> {
        const params = req.params as CleanTodoParams

        try {
            await this.cleaner.run(params.id)

            res.status(201).json({ message: `todo with id ${params.id} was removed` })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default CleanTodoController