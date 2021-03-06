import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day"
import { StocksCompare } from "../../../data/usecases/filter/stocks-compare"
import { MissingParamError, ServerError } from "../../errors"
import { HttpRequest, HttpResponse } from "../../protocols"
import { StocksCompareController } from './stocks-compare-controller'

const makeFakeRequest = (): HttpRequest => ({ data: { quoteName: "IBM", stocksToCompare: ['VALE3', 'IBM'] } })

const makeFakeResponse = (): HttpResponse => ({
    statusCode: 200,
    data: {
        lastPrices: [
            {
                name: 'IBM',
                lastPrice: 125.17,
                pricedAt: '2021-10-27',
            },
            {
                name: 'PETR4.SA',
                lastPrice: 150.0,
                pricedAt: '2021-10-27',
            },
            {
                name: 'VALE3.SA',
                lastPrice: 74.45,
                pricedAt: '2021-10-27',
            },
            {
                name: 'OUTRA.SA',
                lastPrice: 125.17,
                pricedAt: '2021-10-27',
            },
        ],
    }
})

interface SutTypes {
    sut: StocksCompareController
    lastQuote: LastQuoteDay
}

const makeSut = (): SutTypes => {
    const lastQuote = new LastQuoteDay()
    const stocksCompare = new StocksCompare(lastQuote)
    const sut = new StocksCompareController(stocksCompare)
    return {
        sut,
        lastQuote
    }
}

describe('Stocks Compare Controller', () => {
    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())

        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 400 if no quoteName is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            data: {
                // quoteName: "IBM",
                stocksToCompare: [
                    'VALE3', 'IBM'
                ]
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.data.message).toEqual(new MissingParamError('quoteName'))
    })

    test('Should return 400 if no stocksToCompare is provided', async () => {
        const { sut } = makeSut()

        const httpRequest = {
            data: {
                quoteName: "IBM",
                // stocksToCompare: [
                //     'VALE3', 'IBM'
                // ]
            }
        }

        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.data.message).toEqual(new MissingParamError('stocksToCompare'))
    })

    test('Should return 500 if LastQuote returns throw', async () => {
        const { sut, lastQuote } = makeSut()
        jest.spyOn(lastQuote, "filter").mockImplementationOnce(() => {
            throw new Error()
        })

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.data.message).toEqual(new ServerError(new Error()))
    })
})
