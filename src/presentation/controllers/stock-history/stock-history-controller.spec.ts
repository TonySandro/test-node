import { HttpRequest, HttpResponse } from "../../protocols"
import { StockHistoryController } from "./stock-history-controller"


const makeFakeRequest = (): HttpRequest => ({ data: { quoteName: "IBM" } })

interface SutTypes {
    sut: StockHistoryController
}

const makeSut = (): SutTypes => {
    const sut = new StockHistoryController()
    return {
        sut
    }
}

describe('Stock History Controller', () => {
    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())

        expect(httpResponse.statusCode).toBe(200)
    })
})