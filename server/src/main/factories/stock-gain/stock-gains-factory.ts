import { StockPriceAtDate } from "../../../data/usecases/filter/stock-prince-at-date"
import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day"
import { StockGainsController } from "../../../presentation/controllers/stock-gains/stock-gains-controller"

export const makeStockGainsController = (): StockGainsController => {
    const stockPriceAtDate = new StockPriceAtDate()
    const lastQuote = new LastQuoteDay()
    const stockGainsController = new StockGainsController(lastQuote, stockPriceAtDate)
    return stockGainsController
}