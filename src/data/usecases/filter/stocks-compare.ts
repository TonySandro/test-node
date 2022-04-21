import { ApiHelper } from "../../../infra/http/axios/helpers/api-helper"
import { LastQuoteDay } from "./last-quote-day"

export class StocksCompare {
    constructor(private readonly lastQuote: LastQuoteDay) {
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