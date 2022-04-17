import { lastQuoteDay } from "../../../data/usecases/filter/last-quote-day"
import { fetchQuote } from "../../../infra/http/axios/helpers/api-helper"
import { MissingParamError } from "../../errors"
import { badRequest, success } from "../../helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"

export class QuoteController implements Controller {
    constructor() {
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { quoteName } = httpRequest.data

            const quoteData = await fetchQuote(quoteName)

            if (!quoteData || quoteName === "") {
                return badRequest(new MissingParamError("quote"))
            }

            const lastQuote = lastQuoteDay(quoteData)

            return success({
                name: quoteName, ...lastQuote,
            })
        } catch (error) {
            console.log(error)
        }
    }
}