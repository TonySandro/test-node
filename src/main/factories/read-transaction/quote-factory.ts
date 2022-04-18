import { LastQuoteDay } from "data/usecases/filter/last-quote-day";
import { QuoteController } from "../../../presentation/controllers/quote/quote-controller";

export const makeQuoteController = (): QuoteController => {
    const lastQuote = new LastQuoteDay()
    const quoteController = new QuoteController(lastQuote)
    return quoteController
}