import { StockPricesModel } from "../../../domain/models/stock-prices"
import { iStockHistory } from "../../../domain/usecases/stock-history"

function addStock(stock: any, date: string) {
    return {
        opening: parseFloat(stock['1. open']),
        low: parseFloat(stock['3. low']),
        high: parseFloat(stock['2. high']),
        closing: parseFloat(stock['4. close']),
        pricedAt: date,
        volume: parseFloat(stock['5. volume'])
    }
}

function parseDateStringToNumber(date: string) {
    return parseInt(date.replaceAll('-', ''))
}

export class StockHistoryMonth implements iStockHistory {
    filter(allQuote: any, fromDate: string, toDate: string): StockPricesModel[] {
        let from = parseDateStringToNumber(fromDate)
        let to = parseDateStringToNumber(toDate)

        let resultQuote = []

        Object.keys(allQuote).forEach(item => {
            let date = parseDateStringToNumber(item)

            if (date >= from && date <= to) {
                let validItem = allQuote[item]
                resultQuote.push(addStock(validItem, item))
            }
        })

        return resultQuote
    }
}