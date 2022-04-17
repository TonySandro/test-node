import { ServerError } from "../../errors"
import { success } from "../../helpers/http/http-helper"
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

describe('Quote Controller - Success case', () => {
    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle({})

        expect(httpResponse.statusCode).toBe(200)
    })
})

// describe('Quote Controller - Exceptions', () => {

// })
