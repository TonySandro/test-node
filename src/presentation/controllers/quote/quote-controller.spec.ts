import { LastQuoteDay } from "../../../data/usecases/filter/last-quote-day"
import { MissingParamError, ServerError } from "../../errors"
import { HttpRequest, HttpResponse } from "../../protocols"
import { QuoteController } from "./quote-controller"

const makeFakeResponse = (): HttpResponse => ({
    statusCode: 200,
    data: {
        name: "IBM",
        lastPrice: "126.7000",
        pricedAt: "2022-04-14"
    }
})

const makeFakeRequest = (): HttpRequest => ({ data: { quoteName: "IBM" } })

interface SutTypes {
    sut: QuoteController
    lastQuote: LastQuoteDay
}

const makeSut = (): SutTypes => {
    const lastQuote = new LastQuoteDay()
    const sut = new QuoteController(lastQuote)
    return {
        sut,
        lastQuote
    }
}

describe('Quote Controller', () => {
    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle(makeFakeRequest())

        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 200 if returns correct values', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "handle").mockReturnValueOnce(
            new Promise(resolve => resolve(makeFakeResponse())))

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(makeFakeResponse())
    })

    test('Should returns 400 if no name is provided', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle({ data: { quoteName: "" } })
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.data.Message).toEqual(new MissingParamError('quote'))
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