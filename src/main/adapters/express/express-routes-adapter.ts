import { Controller, HttpRequest } from "../../../presentation/protocols"
import { Request, Response } from 'express'


export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            data: {
                quoteName: req.params.stockName
            }
        }

        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.data)
    }
}
