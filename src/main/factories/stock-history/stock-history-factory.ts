import { StockHistoryController } from "../../../presentation/controllers/stock-history/stock-history-controller";

export const makeStockHistoryController = (): StockHistoryController => {
    const stockHistory = new StockHistoryController()
    return stockHistory
}