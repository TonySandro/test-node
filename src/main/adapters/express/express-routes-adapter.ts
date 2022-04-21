import { Controller, HttpRequest } from "../../../presentation/protocols"
import { Request, Response } from 'express'


export const adaptRoute = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            data: req.params
        }

        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.data)
    }
}

export const adaptRouteStockHistory = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            data: {
                stockName: req.params.stockName,
                from: req.query.from,
                to: req.query.to
            }
        }

        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.data)
    }
}

export const adaptRouteToStocksCompare = (controller: Controller) => {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            data: {
                quoteName: req.params.quoteName,
                stocksToCompare: req.query.stocksToCompare
            }
        }

        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.data)
    }
}
