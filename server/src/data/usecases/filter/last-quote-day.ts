import { QuoteModel } from "domain/models/quote"
import { iLastQuote } from "domain/usecases/last-quote"

export class LastQuoteDay implements iLastQuote {
    filter(allQuote: any, quoteName?: string): QuoteModel {
        let lastDayQuotePosition = Object.keys(allQuote)[0]
        const lastQuote = allQuote[lastDayQuotePosition]

        return {
            name: quoteName || "",
            lastPrice: parseFloat(lastQuote['4. close']),
            pricedAt: lastDayQuotePosition.substring(0, 10)
        }
    }
}