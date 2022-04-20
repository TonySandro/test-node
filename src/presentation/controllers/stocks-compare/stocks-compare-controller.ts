import { Controller, HttpRequest, HttpResponse } from "@presentation/protocols";

export class StocksCompareController implements Controller {
    constructor() { }
    handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => resolve({ statusCode: 200, data: {} }))
    }
}