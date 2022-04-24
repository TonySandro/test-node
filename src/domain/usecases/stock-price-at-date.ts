import { QuoteModel } from "../models/quote";

export interface iStockPriceAtDate {
    filter(allQuote: any, fromDate: string): QuoteModel
}