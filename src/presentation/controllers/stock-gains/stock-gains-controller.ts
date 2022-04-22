import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day";
import { ApiHelper } from "../../../infra/http/axios/helpers/api-helper";
import { MissingParamError } from "../../errors";
import { badRequest, serverError } from "../../helpers/http/http-helper";
import { success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";
import { StockPriceAtDate } from "../../../data/usecases/filter/stock-prince-at-date";

export class StockGainsController implements Controller {
    constructor(
        private readonly lastQuote: LastQuoteDay,
        private readonly stockPriceAtDate: StockPriceAtDate,
    ) {
        this.lastQuote = lastQuote
        this.stockPriceAtDate = stockPriceAtDate
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

            const allQuote = await ApiHelper.fetchStockHistory(stockName)
            const lastQuote = this.lastQuote.filter(allQuote, stockName)

            const quoteAtDate = this.stockPriceAtDate.filter(allQuote, purchasedAt)

            const gain = {
                name: stockName,
                lastPrice: lastQuote.lastPrice,
                priceAtDate: quoteAtDate.lastPrice,
                purchasedAmount: purchasedAmount,
                purchasedAt: purchasedAt,
                capitalGains: (lastQuote.lastPrice * purchasedAmount) - (quoteAtDate.lastPrice * purchasedAmount),
            }

            return success(gain)
        } catch (error) {
            return serverError(error)
        }
    }
}