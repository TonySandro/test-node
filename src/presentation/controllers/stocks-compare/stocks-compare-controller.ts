import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day";
import { ApiHelper } from "../../../infra/http/axios/helpers/api-helper";
import { MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class StocksCompareController implements Controller {
    constructor(private readonly lastQuote: LastQuoteDay) {
        this.lastQuote = lastQuote
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

            let lastPrices = []
            const allFields = [quoteName, ...stocksToCompare]
            allFields.map(async (item) => {
                let fetchLastPrices = await ApiHelper.fetchQuote(item)
                let lastQuoteCompare = this.lastQuote.filter(fetchLastPrices, item)

                lastPrices.push(lastQuoteCompare)
            })



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