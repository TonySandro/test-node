import { Router } from "express";
import { makeQuoteController } from "../factories/quote/quote-factory";
import { adaptRoute } from "../adapters/express/express-routes-adapter";

export default (route: Router): void => {
    route.get('/stock/:quoteName/quote', adaptRoute(makeQuoteController()))
}