import { Controller, HttpRequest } from "../../../presentation/protocols"
import { Request, Response } from 'express'


export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const stockName = req.params.stockName
        const httpRequest: HttpRequest = {
            data: {
                quoteName: stockName.toUpperCase()
            }
        }

        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.data)
    }
}
