import { MissingParamError, ServerError } from "../../errors"
import { StockGainsController } from "./stock-gains-controller"
import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day"
import { StockPriceAtDate } from "../../../data/usecases/filter/stock-prince-at-date";

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
    stockPriceAtDate: StockPriceAtDate
}

const makeSut = (): SutTypes => {
    const stockPriceAtDate = new StockPriceAtDate()
    const lastQuote = new LastQuoteDay()
    const sut = new StockGainsController(lastQuote, stockPriceAtDate)
    return {
        sut,
        lastQuote,
        stockPriceAtDate
    }
}

describe('Stock Gains Controller', () => {
    test('Should return 200 if on sucess', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(makeFakeRequest())
        console.log(httpResponse)
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

    test('Should return 500 if stockPriceAtDate throws', async () => {
        const { sut, stockPriceAtDate } = makeSut()
        jest.spyOn(stockPriceAtDate, 'filter').mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.data.message).toEqual(new ServerError(new Error()))
    })
})
