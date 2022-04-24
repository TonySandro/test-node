import { StockPricesModel } from "../models/stock-prices";

export interface iStockHistory {
    filter(allQuote: any, fromDate: string, toDate: string): StockPricesModel[]
}