export const lastQuoteDay = (allQuote: any) => {
    let lastDayQuotePosition = Object.keys(allQuote)[0]
    const lastQuote = allQuote[lastDayQuotePosition]

    return {
        lastPrice: lastQuote['4. close'],
        pricedAt: lastDayQuotePosition
    }
}