import { Service } from 'typedi'
import { Request, Response } from "express";
import TodoChecker from "../../../todo/application/todoChecker";
import Controller from "./controller";

type CompleteTodoParams = {
    id: string
}

@Service()
class CompleteTodoController implements Controller {
    constructor(private readonly checker: TodoChecker) { }
    
    async run(req: Request, res: Response): Promise<void> {
        const params = req.params as CompleteTodoParams

        try {
            await this.checker.run(params.id)

            res.status(201).json({ message: `todo with id ${params.id} was completed` })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default CompleteTodoController