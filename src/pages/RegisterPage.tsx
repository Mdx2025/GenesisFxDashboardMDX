import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton, GlassCard, GlassSelect } from '@/components/ui'

function UserIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="15.6473" cy="7.82311" r="5.21569" fill="#00B38C" />
      <ellipse cx="15.647" cy="22.1669" rx="9.12745" ry="5.21569" fill="#00B38C" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.3278 2.31055H19.6382C21.8165 2.31055 22.9057 2.31055 23.5824 2.98726C24.2591 3.66398 24.2591 4.75314 24.2591 6.93146V24.5487H25.4144C25.8929 24.5487 26.2808 24.9366 26.2808 25.4151C26.2808 25.8936 25.8929 26.2815 25.4144 26.2815H2.30978C1.83127 26.2815 1.44336 25.8936 1.44336 25.4151C1.44336 24.9366 1.83127 24.5487 2.30978 24.5487H3.46501V10.3971C3.46501 8.21883 3.46501 7.12967 4.14173 6.45295C4.81844 5.77623 5.9076 5.77623 8.08592 5.77623H12.7068C14.8852 5.77623 15.9743 5.77623 16.651 6.45295C17.3278 7.12967 17.3278 8.21883 17.3278 10.3971V24.5487H19.0606V10.3971L19.0606 10.2938C19.0607 9.29376 19.0608 8.3769 18.9606 7.63105C18.8501 6.80973 18.5903 5.94163 17.8763 5.22765C17.1624 4.51366 16.2943 4.25386 15.4729 4.14343C14.7376 4.04457 13.836 4.04328 12.8524 4.04338C12.9498 3.59602 13.1123 3.25851 13.3836 2.98726C14.0603 2.31055 15.1494 2.31055 17.3278 2.31055ZM6.06427 9.24192C6.06427 8.76341 6.45218 8.3755 6.9307 8.3755H13.8621C14.3406 8.3755 14.7285 8.76341 14.7285 9.24192C14.7285 9.72043 14.3406 10.1083 13.8621 10.1083H6.9307C6.45218 10.1083 6.06427 9.72043 6.06427 9.24192ZM6.06427 12.7076C6.06427 12.2291 6.45218 11.8412 6.9307 11.8412H13.8621C14.3406 11.8412 14.7285 12.2291 14.7285 12.7076C14.7285 13.1861 14.3406 13.574 13.8621 13.574H6.9307C6.45218 13.574 6.06427 13.1861 6.06427 12.7076ZM6.06427 16.1733C6.06427 15.6948 6.45218 15.3069 6.9307 15.3069H13.8621C14.3406 15.3069 14.7285 15.6948 14.7285 16.1733C14.7285 16.6518 14.3406 17.0397 13.8621 17.0397H6.9307C6.45218 17.0397 6.06427 16.6518 6.06427 16.1733ZM10.3964 21.083C10.8749 21.083 11.2628 21.4709 11.2628 21.9494V24.5487H9.52996V21.9494C9.52996 21.4709 9.91787 21.083 10.3964 21.083Z" fill="#00B38C" />
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
      className={`group relative w-[10.8125rem] h-[13.864rem] flex flex-col items-center rounded-[2rem] bg-[#0c1311] cursor-pointer transition-all overflow-hidden ${
        selected ? 'border border-gfx-green-500/50' : 'border-[0.7px] border-[#0C1311] hover:border-[#2f2f2f]'
      }`}
      style={{ boxShadow: '0px 2.8px 14px rgba(0,0,0,0.03)' }}
    >
      <div className="absolute -bottom-[3rem] left-1/2 -translate-x-1/2 w-[9rem] h-[8.4rem] rounded-full bg-[#40C99C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ filter: 'blur(68px)' }} />
      <div className="absolute -bottom-[3rem] left-1/2 -translate-x-1/2 w-[9rem] h-[8.4rem] rounded-full bg-[#40C99C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ filter: 'blur(74px)' }} />
      <div className="w-[4.125rem] h-[4.125rem] rounded-full bg-[#09241c] flex items-center justify-center relative z-10 mt-[2.5rem]">
        {icon}
      </div>
      <span className="text-white text-[1rem] leading-[1.2] relative z-10 mt-[0.75rem]">{title}</span>
      <span className="text-[#808080] text-[1rem] text-center leading-[1.2] relative z-10 mt-[0.25rem]">{description}</span>
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

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-xs flex flex-col items-center gap-2 px-25 py-10 bg-transparent">
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
            onClick={() => { setAccountType('individual'); onContinue() }}
          />
          <AccountTypeCard
            icon={<BuildingIcon />}
            title="Corporate"
            description="Business trading account"
            selected={accountType === 'corporate'}
            onClick={() => { setAccountType('corporate'); onContinue() }}
          />
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

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-xs flex flex-col items-center gap-2 px-25 py-10 bg-transparent">
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

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-xs flex flex-col items-center gap-2 px-25 py-10 bg-transparent">
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

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-xs flex flex-col items-center gap-2 px-25 py-10 bg-transparent">
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
