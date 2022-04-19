import { MissingParamError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"

export class StockHistoryController implements Controller {
    constructor() { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['from', 'to']

            for (const field of requiredFields) {
                if (!httpRequest.data[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            return success({
                name: 'any',
                prices: [
                    {
                        opening: 14.05,
                        low: 13.77,
                        high: 14.6,
                        closing: 14.35,
                        pricedAt: '2021-10-22',
                        volume: 36461100,
                    },
                    {
                        opening: 14.49,
                        low: 13.77,
                        high: 14.61,
                        closing: 14.16,
                        pricedAt: '2021-10-21',
                        volume: 34002600,
                    },
                    {
                        opening: 15.68,
                        low: 14.85,
                        high: 15.68,
                        closing: 15.01,
                        pricedAt: '2021-10-20',
                        volume: 36340900,
                    },
                ],
            })
        } catch (error) {
            return serverError(error)
        }
    }
}