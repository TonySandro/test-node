import { StockHistoryMonth } from "../../../data/usecases/filter/stock-history-month";
import { StockHistoryController } from "../../../presentation/controllers/stock-history/stock-history-controller";

export const makeStockHistoryController = (): StockHistoryController => {
    const stockHistoryMonth = new StockHistoryMonth()
    const stockHistory = new StockHistoryController(stockHistoryMonth)
    return stockHistory
}