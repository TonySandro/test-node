import { QuoteModel } from "domain/models/quote";

export interface iLastQuote {
    filter(allQuote: any): QuoteModel
}