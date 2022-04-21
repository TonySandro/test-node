import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http/http-helper";
import { success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class StockGainsController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const requiredField = ["stockName", "purchasedAt", "purchasedAmount"]

        for (const field of requiredField) {
            if (!httpRequest.data[field]) {
                return badRequest(new MissingParamError(field))
            }
        }
        return success("")
    }
}