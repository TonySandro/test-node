import { StocksCompareController } from "../../../presentation/controllers/stocks-compare/stocks-compare-controller";
import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day";
import { StocksCompare } from "../../../data/usecases/filter/stocks-compare";

export const makeStocksCompareController = (): StocksCompareController => {
    const lastQuote = new LastQuoteDay()
    const stocksCompare = new StocksCompare(lastQuote)
    const stocksCompareController = new StocksCompareController(stocksCompare)
    return stocksCompareController
}