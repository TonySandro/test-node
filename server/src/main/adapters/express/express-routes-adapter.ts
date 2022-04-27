import { Controller, HttpRequest } from "../../../presentation/protocols"
import { Request, Response } from 'express'


export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            data: Object.assign(req.params, req.query)
        }

        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.data)
    }
}