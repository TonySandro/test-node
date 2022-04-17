import { QuoteController } from "../../../presentation/controllers/consultation/quote-controller";

export const makeQuoteController = (): QuoteController => {
    const quoteController = new QuoteController()
    return quoteController
}