import { StockHistoryMonth } from "../../../data/usecases/filter/stock-history-month"
import { ApiHelper } from "../../../infra/http/axios/helpers/api-helper"
import { MissingParamError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"

export class StockHistoryController implements Controller {
    constructor(private readonly stockHistoryMonth: StockHistoryMonth) {
        this.stockHistoryMonth = stockHistoryMonth
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredFields = ['from', 'to']
            const { from, to, stockName } = httpRequest.data

            for (const field of requiredFields) {
                if (!httpRequest.data[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const allStockHistory = await ApiHelper.fetchStockHistory(stockName)
            const validStocks = this.stockHistoryMonth.filter(allStockHistory, from, to)

            return success({
                name: stockName,
                prices: validStocks
            })
        } catch (error) {
            return serverError(error)
        }
    }
}