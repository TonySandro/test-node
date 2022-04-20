
export class StockHistoryMonth {
    filter(allQuote: any, fromDate: string, toDate: string) {
        console.log(fromDate, toDate)
        let fromDateParseToInt = parseInt(fromDate.replaceAll('-', ''))
        let toDateParseToInt = parseInt(toDate.replaceAll('-', ''))

        let resultQuote = []

        Object.keys(allQuote).forEach(item => {
            let itemDateParseToInt = parseInt(item.replaceAll('-', ''))

            if (
                itemDateParseToInt >= fromDateParseToInt &&
                itemDateParseToInt <= toDateParseToInt
            ) {
                let validItem = allQuote[item]
                resultQuote.push({
                    opening: validItem['1. open'],
                    low: validItem['3. low'],
                    high: validItem['2. high'],
                    closing: validItem['4. close'],
                    pricedAt: item,
                    volume: validItem['5. volume']
                })
            }
        })

        return resultQuote
    }
}