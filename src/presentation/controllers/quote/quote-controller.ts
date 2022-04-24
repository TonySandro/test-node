import { iLastQuote } from "../../../domain/usecases/last-quote"
import { ApiHelper } from "../../../infra/http/axios/helpers/api-helper"
import { MissingParamError } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../protocols"

export class QuoteController implements Controller {
    constructor(private readonly lastQuote: iLastQuote) {
        this.lastQuote = lastQuote
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { quoteName } = httpRequest.data

            const quoteData = await ApiHelper.fetchQuote(quoteName)


            if (!quoteData || quoteName === "") {
                return badRequest(new MissingParamError("quote"))
            }

            const lastQuote = this.lastQuote.filter(quoteData)

            return success({
                name: quoteName,
                pricedAt: lastQuote.pricedAt,
                lastPrice: lastQuote.lastPrice,
            })
        } catch (error) {
            return serverError(error)
        }
    }
}