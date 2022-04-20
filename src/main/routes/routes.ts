import { Router } from "express";
import { makeQuoteController } from "../factories/quote/quote-factory";
import { adaptRoute, adaptRouteStockHistory } from "../adapters/express/express-routes-adapter";
import { makeStockHistoryController } from "../factories/stock-history/stock-history-factory";

export default (route: Router): void => {
    route.get('/stock/:quoteName/quote', adaptRoute(makeQuoteController()))
    route.get(`/stocks/:stockName/history?`, adaptRouteStockHistory(makeStockHistoryController()))
}