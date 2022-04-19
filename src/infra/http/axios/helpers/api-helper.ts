import { api } from "../api/api"

const key = "JVIEUBBVF4KCEK99"
const funcTimeSeries = "TIME_SERIES_INTRADAY"
const funcMonthly = "function=TIME_SERIES_MONTHLY_ADJUSTED"

export const ApiHelper = {
    async fetchQuote(quote: string) {
        const quoteData = await api.get(
            `query?function=${funcTimeSeries}&symbol=${quote}&interval=5min&apikey=${key}`
        ).then(res => {
            return res.data
        })

        return quoteData["Time Series (5min)"]
    },

    async fetchStockHistory(quote: string) {
        const stockHistory = await api.get(
            `query?${funcMonthly}&symbol=${quote}&apikey=${key}`
        ).then(res => {
            return res.data
        })

        return stockHistory["Monthly Adjusted Time Series"]
    }
}