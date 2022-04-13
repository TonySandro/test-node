import { QuoteController } from "./quoteController"

const makeSut = () => {
    const sut = new QuoteController()
    return {
        sut
    }
}


describe('Quote Controller - Success case', () => {
    test('Should return 200 on success', async () => {
        const { sut } = makeSut()
        const httpResponse = await sut.handle()

        expect(httpResponse).toEqual(httpResponse)
    })
})

describe('Quote Controller - Exceptions', () => {
    test('', () => {

    })
})
