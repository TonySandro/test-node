import { api } from "../api/api"

const apiKey = "apikey=JVIEUBBVF4KCEK99"
const functionIntra = "function=TIME_SERIES_INTRADAY"

export const fetchQuote = async (quote: string) => {
    const quoteData = await api.get(
        `query?${functionIntra}&symbol=${quote}&interval=5min&${apiKey}`
    ).then(res => {
        console.log(res)
        return res
    }).catch(err => {
        return err
    })

    return quoteData
}
