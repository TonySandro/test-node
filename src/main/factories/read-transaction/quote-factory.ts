import { QuoteController } from "../../../presentation/controllers/quote/quote-controller";

export const makeQuoteController = (): QuoteController => {
    const quoteController = new QuoteController()
    return quoteController
}