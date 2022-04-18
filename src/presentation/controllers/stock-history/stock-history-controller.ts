import { serverError, success } from "../../helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"

export class StockHistoryController implements Controller {
    constructor() { }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            return success(null)
        } catch (error) {
            return serverError(error)
        }
    }
}