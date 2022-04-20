import { StocksCompareController } from "../../../presentation/controllers/stocks-compare/stocks-compare-controller";
import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day";

export const makeStocksCompareController = (): StocksCompareController => {
    const lastQuote = new LastQuoteDay()
    const stocksCompareController = new StocksCompareController(lastQuote)
    return stocksCompareController
}