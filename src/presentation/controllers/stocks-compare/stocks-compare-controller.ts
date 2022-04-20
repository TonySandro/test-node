import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class StocksCompareController implements Controller {
    constructor() { }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const { stocksToCompare, quoteName } = httpRequest.data

        const requiredFields = ['quoteName', 'stocksToCompare']
        for (const field of requiredFields) {
            if (!httpRequest.data[field]) {
                return badRequest(new MissingParamError(field))
            }
        }

        return {
            statusCode: 200,
            data: {}
        }
    }
}