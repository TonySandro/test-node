import { iStockPrices } from "../../../domain/models/stock-prices";

export interface iStockHistory {
    filter(allQuote: any, fromDate: string, toDate: string): iStockPrices[]
}