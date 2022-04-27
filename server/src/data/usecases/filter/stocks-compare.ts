import { iLastQuote } from "../../../domain/usecases/last-quote"
import { ApiHelper } from "../../../infra/http/axios/helpers/api-helper"

export class StocksCompare {
    constructor(private readonly lastQuote: iLastQuote) {
        this.lastQuote = lastQuote
    }

    async filter(allFields: any) {
        const lastPrices = []

        for (const item of allFields) {
            let fetchLastPrices = await ApiHelper.fetchQuote(item)
            let lastQuoteCompare = this.lastQuote.filter(fetchLastPrices, item)

            lastPrices.push(lastQuoteCompare)
        }

        return lastPrices
    }
}