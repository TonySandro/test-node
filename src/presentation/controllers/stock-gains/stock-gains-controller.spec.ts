import { StockGainsController } from "./stock-gains-controller"

interface SutTypes {
    sut: StockGainsController
}

const makeFakeRequest = () => ({
    data: {
        stockName: 'IBM',
        purchasedAt: '2022-04-10',
        purchasedAmount: '10'
    }
})

const makeSut = (): SutTypes => {
    const sut = new StockGainsController()
    return {
        sut
    }
}

describe('Stock Gains Controller', () => {
    test('Should return 200 if on sucess', async () => {
        const { sut } = makeSut()

        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse.statusCode).toBe(200)
    })
})
