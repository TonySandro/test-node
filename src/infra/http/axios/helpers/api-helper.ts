import { api } from "../api/api"

const key = "JVIEUBBVF4KCEK99"
const timeSeries = "TIME_SERIES_INTRADAY"

export const fetchQuote = async (quote: string) => {
    const quoteData = await api.get(
        `query?function=${timeSeries}&symbol=${quote}&interval=5min&apikey=${key}`
    ).then(res => {
        return res.data
    })

    return quoteData["Time Series (5min)"]
}
