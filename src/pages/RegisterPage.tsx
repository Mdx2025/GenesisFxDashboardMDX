import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton, GlassCard, GlassSelect } from '@/components/ui'

function UserIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill="#10BC83" />
      <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" fill="#10BC83" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path d="M3 21V7l9-4 9 4v14H3z" fill="#10BC83" />
      <rect x="7" y="10" width="3" height="3" rx="0.5" fill="#09241c" />
      <rect x="14" y="10" width="3" height="3" rx="0.5" fill="#09241c" />
      <rect x="7" y="15" width="3" height="3" rx="0.5" fill="#09241c" />
      <rect x="14" y="15" width="3" height="3" rx="0.5" fill="#09241c" />
    </svg>
  )
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <path d="M10 0C5.45 0 1.57 2.91.07 7c1.5 4.09 5.38 7 9.93 7s8.43-2.91 9.93-7C18.43 2.91 14.55 0 10 0zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M10 3c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92A11.82 11.82 0 0 0 19.93 8C18.43 3.91 14.55 1 10 1c-1.27 0-2.49.2-3.64.57l2.17 2.17C9.08 3.27 9.52 3 10 3zM1 1.27l2.28 2.28.46.46A11.8 11.8 0 0 0 .07 8c1.5 4.09 5.38 7 9.93 7 1.55 0 3.03-.3 4.38-.84l.42.42L17.73 17l1.27-1.27L2.27 0 1 1.27zM6.53 6.8l1.55 1.55c-.05.21-.08.43-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2zm3.31-.78 3.15 3.15.02-.16a3 3 0 0 0-3-3l-.17.01z" fill="currentColor" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className}>
      <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StepBadge({ step, total }: { step: number; total: number }) {
  return (
    <div className="h-[2.125rem] px-[0.875rem] rounded-[2rem] border border-[#2f2f2f] flex items-center">
      <span className="text-[#a0a0a0] text-[1rem] leading-[1.2]">Step {step} of {total}</span>
    </div>
  )
}

function AccountTypeCard({ icon, title, description, selected, onClick }: {
  icon: React.ReactNode
  title: string
  description: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex-1 flex flex-col items-center gap-[0.75rem] p-[1.25rem] rounded-[1.25rem] bg-[#0c1311] cursor-pointer transition-all border overflow-hidden ${
        selected ? 'border-gfx-green-500/50' : 'border-transparent hover:border-[#2f2f2f]'
      }`}
    >
      <div className="absolute bottom-0 left-0 right-0 h-0 group-hover:h-full transition-all duration-500 bg-gradient-to-t from-[#064B34]/40 via-[#064B34]/10 to-transparent pointer-events-none" />
      <div className="w-[4.125rem] h-[4.125rem] rounded-[1.25rem] bg-[#09241c] flex items-center justify-center relative z-10">
        {icon}
      </div>
      <span className="text-white text-[1rem] relative z-10">{title}</span>
      <span className="text-[#808080] text-[1rem] text-center leading-[1.2] relative z-10">{description}</span>
    </button>
  )
}

const BUSINESS_TYPE_OPTIONS = [
  { value: 'llc', label: 'LLC' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'sole_proprietorship', label: 'Sole Proprietorship' },
  { value: 'trust', label: 'Trust' },
  { value: 'other', label: 'Other' },
]

const COUNTRY_OPTIONS = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'sg', label: 'Singapore' },
  { value: 'jp', label: 'Japan' },
  { value: 'other', label: 'Other' },
]

const INPUT_CLASS = "w-full h-[2.875rem] rounded-[1.875rem] bg-[#0c1311] border border-[#064b34] px-[1.625rem] text-white text-[1rem] placeholder:text-[#808080] outline-none focus:border-gfx-green-500/50 transition-colors"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<'individual' | 'corporate'>('individual')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const totalSteps = 3

  return (
    <div className="h-screen bg-[#000705] font-acid relative overflow-hidden">
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 699, height: 699, top: -311, right: -668, background: '#064b34', filter: 'blur(406px)' }}
        aria-hidden="true"
      />

      <div className="flex h-full p-[3.125rem]">
        {/* Left: Hero Image */}
        <div className="relative w-[818px] h-full shrink-0 rounded-[48px] overflow-hidden">
          <img src="/images/login-hero.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute rounded-full pointer-events-none blur-[160px] opacity-20" style={{ width: 587, height: 332, top: -215, right: -270, background: '#00b38c' }} />
          <div className="absolute rounded-full pointer-events-none blur-[160px] opacity-20" style={{ width: 587, height: 332, bottom: -150, left: -150, background: '#00b38c' }} />
          <div className="absolute rounded-full pointer-events-none blur-[140px] opacity-15 mix-blend-plus-lighter" style={{ width: 295, height: 274, bottom: -100, left: -50, background: '#40c99c' }} />
          <div className="absolute rounded-full pointer-events-none blur-[150px] opacity-15 mix-blend-plus-lighter" style={{ width: 295, height: 274, bottom: -80, left: 0, background: '#40c99c' }} />
          <img src="/images/genesis-logo.png" alt="Genesis FX" className="absolute bottom-8 left-1/2 -translate-x-1/2 h-[2.8125rem] w-auto z-10" />
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {step === 1 && <Step1 accountType={accountType} setAccountType={setAccountType} onContinue={() => setStep(2)} totalSteps={totalSteps} />}
          {step === 2 && <Step2 accountType={accountType} showPassword={showPassword} setShowPassword={setShowPassword} showConfirmPassword={showConfirmPassword} setShowConfirmPassword={setShowConfirmPassword} onContinue={() => setStep(3)} onBack={() => setStep(1)} totalSteps={totalSteps} />}
          {step === 3 && accountType === 'corporate' && <Step3Corporate onBack={() => setStep(2)} totalSteps={totalSteps} />}
          {step === 3 && accountType === 'individual' && <Step3Personal onBack={() => setStep(2)} totalSteps={totalSteps} />}

          {/* Footer */}
          <div className="w-full absolute bottom-0 pl-15">
            <div className="bg-[#0c1311] rounded-[0.75rem] px-[1.4375rem] py-[1rem] flex items-center gap-[2.5rem]">
              <span className="text-[#ececec] text-[0.75rem] leading-[1.175rem]">2026 Genesis FX Markets. All rights reserved.</span>
              <div className="flex items-center gap-[1.5rem]">
                <a href="#" className="text-[#a0a0a0] text-[0.75rem] leading-[1.175rem] hover:text-white transition-colors">Terms &amp; Conditions</a>
                <a href="#" className="text-[#a0a0a0] text-[0.75rem] leading-[1.175rem] hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-[#a0a0a0] text-[0.75rem] leading-[1.175rem] hover:text-white transition-colors">Risk Disclosure</a>
                <a href="#" className="text-[#a0a0a0] text-[0.75rem] leading-[1.175rem] hover:text-white transition-colors">Anti-Money Laundering</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Step1({ accountType, setAccountType, onContinue, totalSteps }: {
  accountType: 'individual' | 'corporate'
  setAccountType: (t: 'individual' | 'corporate') => void
  onContinue: () => void
  totalSteps: number
}) {
  return (
    <div className="flex flex-col items-center gap-[1.5rem]">
      <h1 className="text-white text-[3.125rem] font-normal leading-[1.17] text-center">Create Account</h1>

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-fit flex flex-col items-center gap-2 px-25 py-10 bg-transparent">
        <div className="w-full flex items-center justify-between">
          <span className="text-[#ececec] text-[1rem] leading-[1.2]">Account Type</span>
          <StepBadge step={1} total={totalSteps} />
        </div>

        <div className="w-full flex gap-[0.625rem]">
          <AccountTypeCard
            icon={<UserIcon />}
            title="Individual"
            description="Personal trading account"
            selected={accountType === 'individual'}
            onClick={() => setAccountType('individual')}
          />
          <AccountTypeCard
            icon={<BuildingIcon />}
            title="Corporate"
            description="Business trading account"
            selected={accountType === 'corporate'}
            onClick={() => setAccountType('corporate')}
          />
        </div>

        <div className="w-full">
          <GlowButton label="Continue" width="100%" onClick={onContinue} />
        </div>

        <p className="text-[1rem] leading-[1.2]">
          <span className="text-[#808080]">Already have an account? </span>
          <Link to="/" className="text-white hover:underline">Sign In</Link>
        </p>
      </GlassCard>
    </div>
  )
}

function Step2({ accountType, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, onContinue, onBack, totalSteps }: {
  accountType: 'individual' | 'corporate'
  showPassword: boolean
  setShowPassword: (v: boolean) => void
  showConfirmPassword: boolean
  setShowConfirmPassword: (v: boolean) => void
  onContinue: () => void
  onBack: () => void
  totalSteps: number
}) {
  const title = accountType === 'corporate' ? 'Corporate Account' : 'Personal Account'

  return (
    <div className="flex flex-col items-center gap-[1.5rem]">
      <h1 className="text-white text-[3.125rem] font-normal leading-[1.17] text-center">{title}</h1>

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-fit flex flex-col items-center gap-2 px-25 py-10 bg-transparent">
        <p className="text-[#a0a0a0] text-[0.875rem] leading-[1.175rem] text-center">Enter your account credentials</p>

        <div className="w-full flex items-center justify-between">
          <span className="text-[#ececec] text-[1rem] leading-[1.2]">Account Info</span>
          <StepBadge step={2} total={totalSteps} />
        </div>

        <div className="w-full flex flex-col gap-[1.0625rem]">
          <input type="email" placeholder="Email" className={INPUT_CLASS} />

          <div className="w-full relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className={`${INPUT_CLASS} pr-[3.25rem]`}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-[1.25rem] top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0">
              <EyeIcon open={showPassword} />
            </button>
          </div>

          <div className="w-full relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              className={`${INPUT_CLASS} pr-[3.25rem]`}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-[1.25rem] top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0">
              <EyeIcon open={showConfirmPassword} />
            </button>
          </div>

          <input type="text" placeholder="Referral Code (Optional)" className={INPUT_CLASS} />
        </div>

        <div className="w-full flex flex-col gap-[0.5rem]">
          <GlowButton label="Continue" width="100%" onClick={onContinue} />
          <button type="button" onClick={onBack} className="w-full h-[2.875rem] rounded-[1.875rem] border border-[#2f2f2f] bg-transparent text-[#c6c6c6] text-[1rem] font-medium cursor-pointer hover:border-[#404040] transition-colors flex items-center justify-center gap-[0.5rem]">
            <ChevronRight className="rotate-180" />
            Back
          </button>
        </div>

        <p className="text-[1rem] leading-[1.2]">
          <span className="text-[#808080]">Already have an account? </span>
          <Link to="/" className="text-white hover:underline">Sign In</Link>
        </p>
      </GlassCard>
    </div>
  )
}

function Step3Corporate({ onBack, totalSteps }: { onBack: () => void; totalSteps: number }) {
  return (
    <div className="flex flex-col items-center gap-[1.5rem]">
      <h1 className="text-white text-[3.125rem] font-normal leading-[1.17] text-center">Corporate Account</h1>

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-fit flex flex-col items-center gap-2 px-25 py-10 bg-transparent">
        <p className="text-[#a0a0a0] text-[0.875rem] leading-[1.175rem] text-center">Complete your company information</p>

        <div className="w-full flex items-center justify-between">
          <span className="text-[#ececec] text-[1rem] leading-[1.2]">Company Info</span>
          <StepBadge step={3} total={totalSteps} />
        </div>

        <div className="w-full flex flex-col gap-[1.0625rem]">
          <input type="text" placeholder="Company Name" className={INPUT_CLASS} />
          <input type="text" placeholder="Registration Number" className={INPUT_CLASS} />
          <GlassSelect options={BUSINESS_TYPE_OPTIONS} placeholder="Business Type" />
          <input type="text" placeholder="Business Address" className={INPUT_CLASS} />
          <GlassSelect options={COUNTRY_OPTIONS} placeholder="Country of Incorporation" />
        </div>

        <div className="w-full flex flex-col gap-[0.5rem]">
          <GlowButton label="Create Account" width="100%" />
          <button type="button" onClick={onBack} className="w-full h-[2.875rem] rounded-[1.875rem] border border-[#2f2f2f] bg-transparent text-[#c6c6c6] text-[1rem] font-medium cursor-pointer hover:border-[#404040] transition-colors flex items-center justify-center gap-[0.5rem]">
            <ChevronRight className="rotate-180" />
            Back
          </button>
        </div>

        <p className="text-[1rem] leading-[1.2]">
          <span className="text-[#808080]">Already have an account? </span>
          <Link to="/" className="text-white hover:underline">Sign In</Link>
        </p>
      </GlassCard>
    </div>
  )
}

function Step3Personal({ onBack, totalSteps }: { onBack: () => void; totalSteps: number }) {
  return (
    <div className="flex flex-col items-center gap-[1.5rem]">
      <h1 className="text-white text-[3.125rem] font-normal leading-[1.17] text-center">Personal Account</h1>

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-fit flex flex-col items-center gap-2 px-25 py-10 bg-transparent">
        <p className="text-[#a0a0a0] text-[0.875rem] leading-[1.175rem] text-center">Complete your personal information</p>

        <div className="w-full flex items-center justify-between">
          <span className="text-[#ececec] text-[1rem] leading-[1.2]">Personal Info</span>
          <StepBadge step={3} total={totalSteps} />
        </div>

        <div className="w-full flex flex-col gap-[1.0625rem]">
          <div className="flex gap-[0.375rem]">
            <input type="text" placeholder="First Name" className={`flex-1 ${INPUT_CLASS}`} />
            <input type="text" placeholder="Last Name" className={`flex-1 ${INPUT_CLASS}`} />
          </div>
          <input type="tel" placeholder="Phone*" className={INPUT_CLASS} />
          <input type="text" placeholder="Address*" className={INPUT_CLASS} />
          <input type="text" placeholder="Country*" className={INPUT_CLASS} />
        </div>

        <div className="w-full flex flex-col gap-[0.5rem]">
          <GlowButton label="Create Account" width="100%" />
          <button type="button" onClick={onBack} className="w-full h-[2.875rem] rounded-[1.875rem] border border-[#2f2f2f] bg-transparent text-[#c6c6c6] text-[1rem] font-medium cursor-pointer hover:border-[#404040] transition-colors flex items-center justify-center gap-[0.5rem]">
            <ChevronRight className="rotate-180" />
            Back
          </button>
        </div>

        <p className="text-[1rem] leading-[1.2]">
          <span className="text-[#808080]">Already have an account? </span>
          <Link to="/" className="text-white hover:underline">Sign In</Link>
        </p>
      </GlassCard>
    </div>
  )
}
