export interface PammStrategy {
  id: string
  initials: string
  name: string
  verified: boolean
  investors: number
  aum: string
  roi: number
  roiDays: number
  minInvestment: number
  totalPnl: number
  chartData: number[]
}

export const pammStrategies: PammStrategy[] = [
  { id: '1', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90] },
  { id: '2', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [30, 45, 40, 55, 50, 65, 60, 75, 70, 80, 72, 85] },
  { id: '3', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [50, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92] },
  { id: '4', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [35, 50, 42, 58, 52, 68, 62, 78, 72, 82, 76, 88] },
  { id: '5', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [45, 55, 48, 62, 58, 72, 68, 82, 78, 88, 82, 90] },
  { id: '6', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [38, 52, 46, 60, 54, 70, 64, 80, 74, 84, 78, 86] },
  { id: '7', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [42, 56, 50, 64, 58, 74, 68, 84, 78, 88, 82, 92] },
  { id: '8', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [32, 48, 38, 56, 48, 66, 58, 76, 68, 78, 72, 84] },
  { id: '9', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90] },
  { id: '10', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [30, 45, 40, 55, 50, 65, 60, 75, 70, 80, 72, 85] },
  { id: '11', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [50, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92] },
  { id: '12', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 0, aum: '$0.0k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [35, 50, 42, 58, 52, 68, 62, 78, 72, 82, 76, 88] },
]

export const pammTabs = ['Browse', 'Investments', 'Manager'] as const
export const pammFilterTabs = ['Recommended', 'Top ROI', 'Most Investors'] as const
