import { Service } from 'typedi'
import { Request, Response } from "express";
import TodoReader from "../../../todo/application/todoReader";
import Controller from "./controller";

@Service()
class ReadTodoController implements Controller {
    constructor(private reader: TodoReader) { }
    
    async run(_: Request, res: Response): Promise<void> {
        try {
            const todos = await this.reader.run()

            res.status(200).json({ todos })  
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    }
}

export default ReadTodoController