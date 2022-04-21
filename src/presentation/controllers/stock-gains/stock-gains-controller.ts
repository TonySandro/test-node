import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day";
import { ApiHelper } from "../../../infra/http/axios/helpers/api-helper";
import { MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http/http-helper";
import { success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class StockGainsController implements Controller {
    constructor(private readonly lastQuote: LastQuoteDay) {
        this.lastQuote = lastQuote
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { stockName, purchasedAt, purchasedAmount } = httpRequest.data
            const requiredField = ["stockName", "purchasedAt", "purchasedAmount"]

            for (const field of requiredField) {
                if (!httpRequest.data[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const allQuote = await ApiHelper.fetchQuote(stockName)
            this.lastQuote.filter(allQuote, stockName)

            return success("")
        } catch (error) {
            return serverError(error)
        }
    }
}