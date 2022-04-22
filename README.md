# Teste Node - TS - Clean Architecture - TDD

Este teste técnico consiste em uma API para verificar o desempenho de uma ação em cinco cenários:

Preço atual;
Preço histórico
Preço atual em comparação a outras ações;
Projeção de ganhos com compra em data específica.

### Jest

A API utilizada no teste (www.alphavantage.co) tem um limite de 5 requests dentro de 1 minuto, e 500 por dia. Devido a essa limitação, alguns testes rodam com um response fixo na api (src/infra/http/axios/helpers/api-helper.ts)

### Rodar como desenvolvimento (porta 3001)

```
npm run dev
```

### Rodar testes

```
npm run test
```

### Compilar para JS (./dist)

```
npm build
```

### Get Preço atual

**get /stock/:quoteName/quote**

```
{
	"name": "ibm",
	"pricedAt": "2022-04-20",
	"lastPrice": 138.3
}
```

### Get Preço histórico

**get /stocks/:stockName/history?**

ex:

```
{
	"name": "IBM",
	"prices": [
		{
			"opening": 138.23,
			"low": 137.35,
			"high": 141.88,
			"closing": 139.85,
			"pricedAt": "2022-04-21",
			"volume": 9922349
		},
		{
			"opening": 135,
			"low": 133.38,
			"high": 139.56,
			"closing": 138.32,
			"pricedAt": "2022-04-20",
			"volume": 17770306
		}
	]
}
```

### Preço atual em comparação a outras ações

**get /stocks/:quoteName/compare**

```
{
"lastPrices": [
		{
			"name": "IBM",
			"lastPrice": 139.3,
			"pricedAt": "2022-04-21"
		},
		{
			"name": "CIR",
			"lastPrice": 24.26,
			"pricedAt": "2022-04-21"
		}
	]
}
```

### Get Projeção de ganhos

**get /stocks/:stockName/gains?**

```
{
	"name": "IBM",
	"lastPrice": 139.85,
	"priceAtDate": 126.37,
	"purchasedAmount": "10",
	"purchasedAt": "2022-04-11",
	"capitalGains": 134.79999999999995
}
```
