import { MissingParamError } from "../../errors"
import { QuoteController } from "./quote-controller"

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

    test('Should returns api with valid data', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle({})
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.data.Message).toEqual(new MissingParamError('quote'))
    })
})