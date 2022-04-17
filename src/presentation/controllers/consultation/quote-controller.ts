import { serverError, success } from "../../helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"

export class QuoteController implements Controller {
    constructor() {
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            return success({})
        } catch (error) {
            return serverError(error)
        }
    }
}