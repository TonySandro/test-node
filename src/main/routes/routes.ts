import { Router } from "express";
import { makeQuoteController } from "../factories/quote/quote-factory";
import { adaptRoute } from "../adapters/express/express-routes-adapter";
import { makeStockHistoryController } from "../factories/stock-history/stock-history-factory";
import { makeStocksCompareController } from "../factories/stocks-compare/stocks-compare-factory";
import { makeStockGainsController } from "../factories/stock-gain/stock-gains-factory";

export default (route: Router): void => {
    route.get('/stock/:quoteName/quote', adaptRoute(makeQuoteController()))
    route.get(`/stocks/:stockName/history?`, adaptRoute(makeStockHistoryController()))
    route.get('/stocks/:quoteName/compare', adaptRoute(makeStocksCompareController()))
    route.get('/stocks/:stockName/gains?', adaptRoute(makeStockGainsController()))
}