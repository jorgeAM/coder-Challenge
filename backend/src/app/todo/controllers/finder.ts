import { Service } from 'typedi'
import { Request, Response } from "express";
import TodoFinder from "../../../todo/application/todoFinder";
import Controller from "./controller";

type FindTodoParams = {
    id: string
}

@Service()
class FindTodoController implements Controller {
    constructor(private finder: TodoFinder) { }
    
    async run(req: Request, res: Response): Promise<void> {
        const params = req.params as FindTodoParams

        try {
            const todo = await this.finder.run(params.id)

            res.status(201).json({ todo })  
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default FindTodoController