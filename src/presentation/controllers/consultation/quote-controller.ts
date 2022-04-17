import { fetchQuote } from "../../../infra/http/axios/helpers/api-helper"
import { MissingParamError } from "../../errors"
import { badRequest, success } from "../../helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"

export class QuoteController implements Controller {
    constructor() {
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const quoteData = await fetchQuote(httpRequest.data)

        if (quoteData.data["Error Message"] !== undefined) {
            return badRequest(new MissingParamError("quote"))
        }

        return success(quoteData)
    }
}