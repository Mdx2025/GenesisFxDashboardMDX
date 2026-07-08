import type { ComponentType } from 'react'
import DashboardPage from '@/pages/DashboardPage'
import AssetsManagementPage from '@/pages/AssetsManagementPage'
import DepositPage from '@/pages/DepositPage'
import WithdrawPage from '@/pages/WithdrawPage'
import WithdrawProcessingPage from '@/pages/WithdrawProcessingPage'
import KycPage from '@/pages/KycPage'
import AcademyPage from '@/pages/AcademyPage'
import DesignSystemPage from '@/pages/DesignSystemPage'
import NewsPage from '@/pages/NewsPage'
import {
  DashboardIcon, AssetsIcon, DepositIcon, WithdrawIcon,
  UserIcon, AcademyIcon, TradelockerIcon, MarketNewsIcon,
} from '@/components/icons'

export interface PageEntry {
  path: string
  label: string
  description: string
  icon: ComponentType<{ size?: number; color?: string }>
  component: ComponentType
  showInDirectory?: boolean
}

export const PAGE_REGISTRY: PageEntry[] = [
  { path: '/home', label: 'Dashboard', description: 'Portfolio overview, charts, and trading accounts', icon: DashboardIcon, component: DashboardPage },
  { path: '/assets-management', label: 'Assets Management', description: 'Fiat wallet, funding, and transaction history', icon: AssetsIcon, component: AssetsManagementPage },
  { path: '/deposit', label: 'Deposit', description: 'Deposit crypto to your Genesis account', icon: DepositIcon, component: DepositPage },
  { path: '/withdraw', label: 'Withdraw', description: 'Withdraw funds to your external wallet', icon: WithdrawIcon, component: WithdrawPage },
  { path: '/withdraw-processing', label: 'Withdraw Processing', description: 'Withdrawal confirmation and transaction tracking', icon: WithdrawIcon, component: WithdrawProcessingPage, showInDirectory: false },
  { path: '/kyc', label: 'KYC Verification', description: 'Identity verification and compliance', icon: UserIcon, component: KycPage },
  { path: '/news', label: 'Market News', description: 'Latest financial news and market analysis', icon: MarketNewsIcon, component: NewsPage },
  { path: '/academy', label: 'Genesis Academy', description: 'Trading courses and educational resources', icon: AcademyIcon, component: AcademyPage },
  { path: '/design-system', label: 'Design System', description: 'UI components, tokens, and guidelines', icon: TradelockerIcon, component: DesignSystemPage },
]
