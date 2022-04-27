import env from "../../../../main/config/env"
import { api } from "../api/api"

const key = env.apiKey
const funcTimeSeries = "TIME_SERIES_INTRADAY"
const funcDaily = "function=TIME_SERIES_DAILY"

const fakeResponseToTests = {
    "2022-04-19": {
        "1. open": "126.0800",
        "2. high": "129.4000",
        "3. low": "126.0000",
        "4. close": "129.1500",
        "5. volume": "7971361"
    },
    "2022-04-18": {
        "1. open": "126.6000",
        "2. high": "127.3899",
        "3. low": "125.5300",
        "4. close": "126.1700",
        "5. volume": "4884150"
    },
    "2022-04-14": {
        "1. open": "128.9300",
        "2. high": "130.5800",
        "3. low": "126.3800",
        "4. close": "126.5600",
        "5. volume": "6384180"
    },
    "2022-04-13": {
        "1. open": "125.6400",
        "2. high": "126.6700",
        "3. low": "124.9100",
        "4. close": "126.1400",
        "5. volume": "3064918"
    }
}

export const ApiHelper = {
    async fetchQuote(quote: string) {
        // const quoteData = await api.get(
        //     `query?function=${funcTimeSeries}&symbol=${quote}&interval=5min&apikey=${key}`
        // ).then(res => {
        //     return res.data
        // })
        // return quoteData["Time Series (5min)"]

        return fakeResponseToTests
    },

    async fetchStockHistory(quote: string) {
        // const stockHistory = await api.get(
        //     `query?${funcDaily}&symbol=${quote}&apikey=${key}`
        // ).then(res => {
        //     return res.data
        // })
        // return stockHistory["Time Series (Daily)"]

        return fakeResponseToTests
    }
}