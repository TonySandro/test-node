import { MissingParamError } from "../../errors"
import { HttpResponse } from "../../protocols"
import { QuoteController } from "./quote-controller"

const makeFakeResponse = (): HttpResponse => ({
    statusCode: 200,
    data: {
        name: "IBM",
        lastPrice: "126.7000",
        pricedAt: "2022-04-14"
    }
})

interface SutTypes {
    sut: QuoteController
}

const makeSut = (): SutTypes => {
    const sut = new QuoteController()
    return {
        sut,
    }
}

describe('Quote Controller', () => {
    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({ data: { quoteName: "IBM" } })

        expect(httpResponse.statusCode).toBe(200)
    })

    test('Should return 200 if returns correct values', async () => {
        const { sut } = makeSut()
        jest.spyOn(sut, "handle").mockReturnValueOnce(
            new Promise(resolve => resolve(makeFakeResponse())))

        const httpResponse = await sut.handle({ data: { quoteName: "IBM" } })
        expect(httpResponse).toEqual(makeFakeResponse())
    })

    test('Should returns api with valid data', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle({ data: { quoteName: "" } })
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.data.Message).toEqual(new MissingParamError('quote'))
    })
})