import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassInput, GlassTextarea, GlassSelect, GlowButton, SparkleButton, GlowEllipse } from '@/components/ui'

/* ─── Toggle Switch ─── */

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative w-[44px] h-[22px] rounded-full transition-colors cursor-pointer flex-shrink-0 ${
        enabled ? 'bg-gfx-green-350' : 'bg-gfx-green-900'
      }`}
    >
      <div
        className={`absolute top-[2px] w-[18px] h-[18px] rounded-full transition-all ${
          enabled ? 'left-[23px] bg-white' : 'left-[3px] bg-gfx-neutral-250'
        }`}
      />
    </button>
  )
}

/* ─── Section Header ─── */

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 bg-gfx-green-900 rounded-xl p-5">
      <div className="w-[51px] h-[51px] rounded-xl bg-gfx-green-800 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white text-2xl font-acid leading-normal">{title}</h3>
        <p className="text-gfx-neutral-500 text-base font-acid leading-tight mt-0.5">{subtitle}</p>
      </div>
    </div>
  )
}

/* ─── Setting Row ─── */

function SettingRow({ title, subtitle, enabled, onChange }: { title: string; subtitle: string; enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between border border-gfx-neutral-250 rounded-2xl px-6 py-5">
      <div>
        <p className="text-gfx-neutral-600 text-base font-acid leading-tight">{title}</p>
        <p className="text-gfx-neutral-400 text-base font-acid leading-tight mt-1">{subtitle}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  )
}

/* ─── Fee Row ─── */

function FeeRow({ label, helpText, value, suffix }: { label: string; helpText: string; value: string; suffix: string }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-gfx-neutral-600 text-base font-acid leading-tight">{label}</p>
        <span className="text-gfx-green-300 text-base font-acid leading-tight">{value}{suffix}</span>
      </div>
      <div className="w-full h-px bg-[#1a1a1a] my-4" />
      <p className="text-gfx-neutral-400 text-base font-acid leading-tight">{helpText}</p>
    </div>
  )
}

/* ─── Icons ─── */

function BasicDetailsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 2V8H20" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 13H8" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 17H8" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 9H8" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function FeeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 1V23" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function BackArrowIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M19 12H5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#808080" strokeWidth="1.5"/>
      <path d="M12 16V12" stroke="#808080" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1" fill="#808080"/>
    </svg>
  )
}

/* ─── Risk Profile Options ─── */

const riskOptions = [
  { value: 'conservative', label: 'Conservative' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'aggressive', label: 'Aggressive' },
  { value: 'high-risk', label: 'High Risk' },
]

/* ─── Page ─── */

export default function CreateStrategyPage() {
  const navigate = useNavigate()
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  const [username, setUsername] = useState('')
  const [strategyName, setStrategyName] = useState('')
  const [description, setDescription] = useState('')
  const [riskProfile, setRiskProfile] = useState('')
  const [minDeposit, setMinDeposit] = useState('')
  const [privateStrategy, setPrivateStrategy] = useState(false)
  const [hideOpenPositions, setHideOpenPositions] = useState(true)
  const [hideClosedTrades, setHideClosedTrades] = useState(false)
  const [maxInvestors, setMaxInvestors] = useState('')

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'GenSocial', href: '/gensocial/pamm' },
          { label: 'PAMM Strategies', href: '/gensocial/pamm' },
          { label: 'Create Strategy', current: true },
        ]}
      />
      <div className="pb-12 pt-4 max-w-[700px] mx-auto">
        <GlassCard variant="light" divider="none" rounded="19px" className="relative overflow-hidden">
          <GlowEllipse className="left-1/2 -translate-x-1/2 -top-[200px]" />
          <div className="relative p-8 flex flex-col gap-8">

            {/* Page Header (inside card) */}
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => navigate('/gensocial/pamm')}
                className="w-[44px] h-[44px] rounded-full bg-gfx-green-900 flex items-center justify-center cursor-pointer hover:bg-gfx-green-150 transition-colors flex-shrink-0 mt-1"
              >
                <BackArrowIcon />
              </button>
              <div>
                <h1 className="text-white text-4xl font-acid leading-normal">Create New Strategy</h1>
                <p className="text-gfx-neutral-400 text-base font-acid leading-tight mt-1">Set up your PAMM trading strategy</p>
              </div>
            </div>

            {/* Basic Details */}
            <SectionHeader
              icon={<BasicDetailsIcon />}
              title="Basic Details"
              subtitle="Define your strategy identity and requirements."
            />

            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <label className="text-gfx-neutral-600 text-base font-acid leading-tight">Username</label>
                <InfoIcon />
              </div>
              <GlassInput placeholder="Enter username" value={username} onChange={setUsername} />
            </div>

            <div>
              <label className="text-gfx-neutral-600 text-base font-acid leading-tight block mb-1">Strategy Name*</label>
              <GlassInput placeholder="Enter strategy name" value={strategyName} onChange={setStrategyName} />
              <p className="text-gfx-neutral-400 text-xs font-acid mt-1">USD characters only</p>
            </div>

            <div>
              <label className="text-gfx-neutral-600 text-base font-acid leading-tight block mb-1">Strategy Description</label>
              <GlassTextarea placeholder="Enter Strategy Description" value={description} onChange={setDescription} rows={4} />
            </div>

            <div>
              <label className="text-gfx-neutral-600 text-base font-acid leading-tight block mb-1">Risk Profile</label>
              <GlassSelect options={riskOptions} placeholder="Search risk profile..." />
            </div>

            <div>
              <label className="text-gfx-neutral-600 text-base font-acid leading-tight block mb-1">Minimum Deposit(USD) *</label>
              <GlassSelect options={riskOptions} placeholder="Select risk profile..." />
              <p className="text-gfx-neutral-400 text-xs font-acid mt-1">Minimum amount required to invest in this strategy</p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gfx-green-200 to-transparent" />

            {/* Fee Structure */}
            <SectionHeader
              icon={<FeeIcon />}
              title="Fee Structure"
              subtitle="Configure your management and performance fees."
            />

            <FeeRow
              label="Management Fee"
              value="2"
              suffix="%"
              helpText="Fixed fee charged on total assets under management (AUM). Paid annually or upon investor withdrawals."
            />

            <FeeRow
              label="Performance Fee"
              value="10"
              suffix="%"
              helpText="Percentage of profits(P&L) you earn as commission (HWM)."
            />

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gfx-green-200 to-transparent" />

            {/* Advanced Settings */}
            <SectionHeader
              icon={<SettingsIcon />}
              title="Advanced Settings"
              subtitle="Control access, visibility, and investor limits"
            />

            {/* Access */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="#ececec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="#ececec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-gfx-neutral-600 text-base font-acid leading-tight">Access</p>
              </div>
              <SettingRow
                title="Private Strategy"
                subtitle="Require approval for new investors"
                enabled={privateStrategy}
                onChange={setPrivateStrategy}
              />
            </div>

            {/* Visibility */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="#ececec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#ececec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-gfx-neutral-600 text-base font-acid leading-tight">Visibility</p>
              </div>
              <SettingRow
                title="Hide Open Positions"
                subtitle="Hide current open positions from public view"
                enabled={hideOpenPositions}
                onChange={setHideOpenPositions}
              />
              <SettingRow
                title="Hide Closed Trades"
                subtitle="Hide trade history from public view"
                enabled={hideClosedTrades}
                onChange={setHideClosedTrades}
              />
            </div>

            {/* Investor Limits */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#ececec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#ececec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#ececec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#ececec" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-gfx-neutral-600 text-base font-acid leading-tight">Investor Limits</p>
              </div>
              <div>
                <label className="text-gfx-neutral-600 text-base font-acid leading-tight block mb-1">Maximum Investors</label>
                <GlassInput placeholder="Leave empty for unlimited" value={maxInvestors} onChange={setMaxInvestors} />
                <p className="text-gfx-neutral-400 text-base font-acid leading-tight mt-2">Set a limit on the number of investors (optional). Leave empty for unlimited</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <SparkleButton onClick={() => navigate('/gensocial/pamm')}>
                Cancel
              </SparkleButton>
              <GlowButton
                label="Submit Application"
                width={220}
                height={46}
              />
            </div>

          </div>
        </GlassCard>
      </div>
    </div>
  )
}
