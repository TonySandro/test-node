import { QuoteModel } from "../../../domain/models/quote";

export interface iStockPriceAtDate {
    filter(allQuote: any, fromDate: string): QuoteModel
}