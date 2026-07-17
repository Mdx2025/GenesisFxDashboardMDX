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
import DailySinglePage from '@/pages/news/DailySinglePage'
import AccountsPage from '@/pages/AccountsPage'
import AccountDetailsPage from '@/pages/AccountDetailsPage'
import ChallengesPage from '@/pages/ChallengesPage'
import JournalPage from '@/pages/JournalPage'
import PammPage from '@/pages/PammPage'
import PammDetailsPage from '@/pages/PammDetailsPage'
import CopyTradingPage from '@/pages/CopyTradingPage'
import CopyTradingDetailsPage from '@/pages/CopyTradingDetailsPage'
import CreateStrategyPage from '@/pages/CreateStrategyPage'
import SignalsPage from '@/pages/SignalsPage'
import SignalsDetailsPage from '@/pages/SignalsDetailsPage'
import SettingsPage from '@/pages/SettingsPage'
import PartnerPage from '@/pages/PartnerPage'
import VideoSinglePage from '@/pages/academy/VideoSinglePage'
import EbookSinglePage from '@/pages/academy/EbookSinglePage'
import {
  DashboardIcon, AssetsIcon, DepositIcon, WithdrawIcon,
  UserIcon, AcademyIcon, TradelockerIcon, MarketNewsIcon, ChallengesIcon,
  GenSocialIcon,
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
  { path: '/news/daily-single-page', label: 'Daily News', description: 'Single daily news episode view', icon: MarketNewsIcon, component: DailySinglePage, showInDirectory: false },
  { path: '/tradelocker/accounts', label: 'Accounts', description: 'TradeLocker trading accounts overview', icon: TradelockerIcon, component: AccountsPage },
  { path: '/tradelocker/accounts/:accountId', label: 'Account Details', description: 'Individual trading account details', icon: TradelockerIcon, component: AccountDetailsPage, showInDirectory: false },
  { path: '/tradelocker/journal', label: 'Journal', description: 'Track and analyze your trading performance', icon: TradelockerIcon, component: JournalPage },
  { path: '/challenges', label: '10X Challenges', description: 'Prove your skill and level up your capital', icon: ChallengesIcon, component: ChallengesPage },
  { path: '/academy', label: 'Genesis Academy', description: 'Trading courses and educational resources', icon: AcademyIcon, component: AcademyPage },
  { path: '/academy/video-single-page', label: 'Video Course', description: 'Single video course lesson view', icon: AcademyIcon, component: VideoSinglePage, showInDirectory: false },
  { path: '/academy/ebook-single-page', label: 'E-Book', description: 'Single e-book chapter view', icon: AcademyIcon, component: EbookSinglePage, showInDirectory: false },
  { path: '/gensocial/pamm', label: 'PAMM Strategies', description: 'Browse and invest in PAMM strategies', icon: GenSocialIcon, component: PammPage },
  { path: '/gensocial/pamm/details-single-page', label: 'PAMM Details', description: 'PAMM strategy single page details', icon: GenSocialIcon, component: PammDetailsPage, showInDirectory: false },
  { path: '/gensocial/pamm/create-strategy', label: 'Create Strategy', description: 'Create a new PAMM trading strategy', icon: GenSocialIcon, component: CreateStrategyPage, showInDirectory: false },
  { path: '/gensocial/copy-trading', label: 'Copy Trading', description: 'Copy top-performing traders automatically', icon: GenSocialIcon, component: CopyTradingPage },
  { path: '/gensocial/copy-trading/details-single-page', label: 'Copy Trading Details', description: 'Copy trading strategy single page details', icon: GenSocialIcon, component: CopyTradingDetailsPage, showInDirectory: false },
  { path: '/gensocial/signals', label: 'Signals', description: 'Follow expert signal providers and trade ideas', icon: GenSocialIcon, component: SignalsPage },
  { path: '/gensocial/signals/details-single-page', label: 'Signal Details', description: 'Signal provider single page details', icon: GenSocialIcon, component: SignalsDetailsPage, showInDirectory: false },
  { path: '/partner', label: 'Partner Program', description: 'IB partnership, referrals, and commission tracking', icon: GenSocialIcon, component: PartnerPage },
  { path: '/settings', label: 'Settings', description: 'User profile, verification, and account settings', icon: UserIcon, component: SettingsPage },
  { path: '/design-system', label: 'Design System', description: 'UI components, tokens, and guidelines', icon: TradelockerIcon, component: DesignSystemPage },
]
