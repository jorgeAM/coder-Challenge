import { Request, Response } from 'express'

interface Controller {
    run(req: Request, res: Response): Promise<void>
}

export default Controller