import { MissingParamError, ServerError } from "../../errors"
import { StockGainsController } from "./stock-gains-controller"
import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day"

const makeFakeRequest = () => ({
    data: {
        stockName: 'IBM',
        purchasedAt: '2022-04-10',
        purchasedAmount: '10'
    }
})

interface SutTypes {
    sut: StockGainsController
    lastQuote: LastQuoteDay
}

const makeSut = (): SutTypes => {
    const lastQuote = new LastQuoteDay
    const sut = new StockGainsController(lastQuote)
    return {
        sut,
        lastQuote
    }
}

describe('Stock Gains Controller', () => {
    test('Should return 200 if on sucess', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 400 if no stockName is provide', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            data: {
                // stockName: 'IBM',
                purchasedAt: '2022-04-10',
                purchasedAmount: '10'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.data.message).toEqual(new MissingParamError("stockName"))
    })

    test('Should return 400 if no purchasedAt is provide', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            data: {
                stockName: 'IBM',
                // purchasedAt: '2022-04-10',
                purchasedAmount: '10'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.data.message).toEqual(new MissingParamError("purchasedAt"))
    })

    test('Should return 400 if no purchasedAmount is provide', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            data: {
                stockName: 'IBM',
                purchasedAt: '2022-04-10',
                // purchasedAmount: '10'
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.data.message).toEqual(new MissingParamError("purchasedAmount"))
    })

    test('Should return 500 if lastQuote throws', async () => {
        const { sut, lastQuote } = makeSut()
        jest.spyOn(lastQuote, 'filter').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.data.message).toEqual(new ServerError(new Error()))
    })
})
