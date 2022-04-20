import { iStockPrices } from "../../../domain/models/stock-prices";

export interface iStockHistoryMonth {
    filter(allQuote: any, fromDate: string, toDate: string): iStockPrices[]
}