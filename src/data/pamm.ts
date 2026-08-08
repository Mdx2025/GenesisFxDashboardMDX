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

// Array order is the "Recommended" ranking; the other filter tabs re-sort it.
export const pammStrategies: PammStrategy[] = [
  { id: '1', initials: 'KC', name: 'K Dizzy Capital 1.0', verified: true, investors: 128, aum: '$412.5k', roi: 194.12, roiDays: 148, minInvestment: 50, totalPnl: 2.30, chartData: [40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90] },
  { id: '2', initials: 'AV', name: 'Aurora Vault', verified: true, investors: 86, aum: '$268.0k', roi: 231.44, roiDays: 210, minInvestment: 100, totalPnl: 5.80, chartData: [30, 45, 40, 55, 50, 65, 60, 75, 70, 80, 72, 85] },
  { id: '3', initials: 'NM', name: 'Nova Momentum', verified: true, investors: 214, aum: '$736.2k', roi: 148.90, roiDays: 96, minInvestment: 250, totalPnl: 9.15, chartData: [50, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92] },
  { id: '4', initials: 'HS', name: 'Helix Swing', verified: false, investors: 42, aum: '$91.4k', roi: 87.36, roiDays: 64, minInvestment: 25, totalPnl: 1.05, chartData: [35, 50, 42, 58, 52, 68, 62, 78, 72, 82, 76, 88] },
  { id: '5', initials: 'QT', name: 'Quantum Tide', verified: true, investors: 173, aum: '$540.8k', roi: 268.71, roiDays: 302, minInvestment: 500, totalPnl: 12.40, chartData: [45, 55, 48, 62, 58, 72, 68, 82, 78, 88, 82, 90] },
  { id: '6', initials: 'BR', name: 'Bright Ridge FX', verified: false, investors: 9, aum: '$18.7k', roi: 42.55, roiDays: 38, minInvestment: 25, totalPnl: 0.42, chartData: [38, 52, 46, 60, 54, 70, 64, 80, 74, 84, 78, 86] },
  { id: '7', initials: 'SO', name: 'Solace Alpha', verified: true, investors: 305, aum: '$1.2M', roi: 176.08, roiDays: 187, minInvestment: 150, totalPnl: 7.62, chartData: [42, 56, 50, 64, 58, 74, 68, 84, 78, 88, 82, 92] },
  { id: '8', initials: 'IC', name: 'Ironclad Macro', verified: true, investors: 57, aum: '$203.9k', roi: 119.63, roiDays: 121, minInvestment: 200, totalPnl: 3.94, chartData: [32, 48, 38, 56, 48, 66, 58, 76, 68, 78, 72, 84] },
  { id: '9', initials: 'VP', name: 'Vertex Pulse', verified: false, investors: 24, aum: '$47.3k', roi: 63.20, roiDays: 52, minInvestment: 50, totalPnl: 0.88, chartData: [40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90] },
  { id: '10', initials: 'ZN', name: 'Zenith Carry', verified: true, investors: 141, aum: '$389.6k', roi: 208.47, roiDays: 245, minInvestment: 300, totalPnl: 6.71, chartData: [30, 45, 40, 55, 50, 65, 60, 75, 70, 80, 72, 85] },
  { id: '11', initials: 'OD', name: 'Orbit Delta', verified: true, investors: 68, aum: '$154.2k', roi: 95.74, roiDays: 78, minInvestment: 75, totalPnl: 2.16, chartData: [50, 60, 55, 70, 65, 80, 75, 90, 85, 95, 88, 92] },
  { id: '12', initials: 'MW', name: 'Meridian Wave', verified: false, investors: 191, aum: '$612.0k', roi: 133.29, roiDays: 165, minInvestment: 100, totalPnl: 4.58, chartData: [35, 50, 42, 58, 52, 68, 62, 78, 72, 82, 76, 88] },
]

export const pammTabs = ['Browse', 'Investments', 'Manager'] as const
export const pammFilterTabs = ['Recommended', 'Top ROI', 'Most Investors'] as const
