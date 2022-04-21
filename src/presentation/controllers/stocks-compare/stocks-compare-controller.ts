import { StocksCompare } from "../../../data/usecases/filter/stocks-compare";
import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day";
import { MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class StocksCompareController implements Controller {
    constructor(
        private readonly stocksCompare: StocksCompare
    ) {
        this.stocksCompare = stocksCompare
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { quoteName, stocksToCompare } = httpRequest.data
            const requiredFields = ['quoteName', 'stocksToCompare']

            for (const field of requiredFields) {
                if (!httpRequest.data[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const allFields = [quoteName, ...stocksToCompare]
            const lastPrices = await this.stocksCompare.filter(allFields)


            return {
                statusCode: 200,
                data: {
                    lastPrices: lastPrices
                }
            }
        } catch (error) {
            return serverError(error)
        }

    }
}