import { MissingParamError } from "../../errors"
import { HttpRequest, HttpResponse } from "../../protocols"
import { StockHistoryController } from "./stock-history-controller"

const makeFakeResponse = (): HttpResponse => ({
    statusCode: 200,
    data: {
        name: 'any',
        prices: [
            {
                opening: 14.05,
                low: 13.77,
                high: 14.6,
                closing: 14.35,
                pricedAt: '2021-10-22',
                volume: 36461100,
            },
            {
                opening: 14.49,
                low: 13.77,
                high: 14.61,
                closing: 14.16,
                pricedAt: '2021-10-21',
                volume: 34002600,
            },
            {
                opening: 15.68,
                low: 14.85,
                high: 15.68,
                closing: 15.01,
                pricedAt: '2021-10-20',
                volume: 36340900,
            },
        ],
    }
})

const makeFakeRequest = (): HttpRequest => ({ data: { from: "10", to: "12" } })

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

    test('Should return 200 if returns correct values', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "handle").mockReturnValueOnce(
            new Promise(resolve => resolve(makeFakeResponse()))
        )

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(makeFakeResponse())
    })

    test('Should return 400 if no from is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            data: {
                // from: "10",
                to: "12"
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.data.message).toEqual(new MissingParamError('from'))
    })
})