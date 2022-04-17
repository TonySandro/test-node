import { Router } from "express";
import { makeQuoteController } from "../factories/read-transaction/quote-factory";
import { adaptRoute } from "../adapters/express/express-routes-adapter";

export default (route: Router): void => {
    route.get('/stock/:stockName/quote', adaptRoute(makeQuoteController()))
}