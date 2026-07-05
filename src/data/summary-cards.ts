export interface CandleData {
  wickTop: number
  body: number
  wickBottom: number
  bullish: boolean
}

export interface SummaryCardData {
  title: string
  value: string
  changeText: string
  changeColor: 'green' | 'red' | 'amber'
  chartType: 'bar' | 'candlestick' | 'area' | 'none'
  chartData?: number[] | CandleData[]
}

export const summaryCards: SummaryCardData[] = [
  {
    title: 'Total Balance',
    value: '$17,897.30',
    changeText: '+$6,437.21 (56.1%)',
    changeColor: 'green',
    chartType: 'bar',
    chartData: [45, 60, 90, 30, 65, 35],
  },
  {
    title: 'Total Equity',
    value: '$11,246.00',
    changeText: '-$1,258.36 (10.1%)',
    changeColor: 'red',
    chartType: 'candlestick',
    chartData: [
      { wickTop: 80, body: 60, wickBottom: 40, bullish: true },
      { wickTop: 90, body: 50, wickBottom: 30, bullish: false },
      { wickTop: 70, body: 55, wickBottom: 35, bullish: true },
      { wickTop: 85, body: 65, wickBottom: 45, bullish: false },
      { wickTop: 75, body: 45, wickBottom: 25, bullish: true },
      { wickTop: 95, body: 70, wickBottom: 50, bullish: false },
      { wickTop: 80, body: 60, wickBottom: 40, bullish: true },
      { wickTop: 88, body: 58, wickBottom: 38, bullish: false },
    ],
  },
  {
    title: 'Closed P&L (30D)',
    value: '$6,437.21',
    changeText: '+$3,218.60 (33.4%)',
    changeColor: 'amber',
    chartType: 'area',
  },
  {
    title: 'Live Accounts',
    value: '3',
    changeText: '2 Active',
    changeColor: 'green',
    chartType: 'none',
  },
]
