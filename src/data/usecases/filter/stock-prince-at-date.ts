import { iStockPriceAtDate } from "../../../domain/usecases/stock-price-at-date/stock-price-at-date"
import { QuoteModel } from "../../../domain/models/quote"

export class StockPriceAtDate implements iStockPriceAtDate {
    filter(allQuote: any, fromDate: string): QuoteModel {
        const price = parseFloat(allQuote[fromDate]['4. close'])
        return {
            name: "",
            lastPrice: price,
            pricedAt: fromDate
        }
    }
}