import { MissingParamError } from "../../errors"
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
})
