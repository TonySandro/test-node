import { QuoteModel } from "domain/models/quote"
import { iLastQuote } from "domain/usecases/last-quote/last-quote"

export class LastQuoteDay implements iLastQuote {
    filter(allQuote: any, quoteName?: string): QuoteModel {
        let lastDayQuotePosition = Object.keys(allQuote)[0]
        const lastQuote = allQuote[lastDayQuotePosition]

        return {
            name: quoteName || "",
            lastPrice: lastQuote['4. close'],
            pricedAt: lastDayQuotePosition
        }
    }
}