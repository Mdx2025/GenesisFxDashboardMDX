export interface CandleData {
  x?: number
  wickTop: number
  body?: number
  bodyTop?: number
  bodyBottom?: number
  bodyWidth?: number
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
    chartData: [42, 64, 27, 100, 74, 9],
  },
  {
    title: 'Total Equity',
    value: '$11,246.00',
    changeText: '-$1,258.36 (10.1%)',
    changeColor: 'red',
    chartType: 'candlestick',
    chartData: [
      { x: 11, wickTop: 0, bodyTop: 15, bodyBottom: 39, bodyWidth: 7, wickBottom: 54, bullish: true },
      { x: 34, wickTop: 20, bodyTop: 33, bodyBottom: 49, bodyWidth: 7, wickBottom: 60, bullish: false },
      { x: 57, wickTop: 40, bodyTop: 52, bodyBottom: 68, bodyWidth: 7, wickBottom: 79, bullish: false },
      { x: 80, wickTop: 15, bodyTop: 30, bodyBottom: 54, bodyWidth: 7, wickBottom: 69, bullish: true },
      { x: 103, wickTop: 0, bodyTop: 14, bodyBottom: 30, bodyWidth: 7, wickBottom: 41, bullish: false },
      { x: 126, wickTop: 20, bodyTop: 33, bodyBottom: 49, bodyWidth: 7, wickBottom: 60, bullish: false },
      { x: 148, wickTop: 0, bodyTop: 16, bodyBottom: 40, bodyWidth: 6, wickBottom: 55, bullish: true },
      { x: 169, wickTop: 36, bodyTop: 38, bodyBottom: 44, bodyWidth: 6, wickBottom: 48, bullish: false },
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
