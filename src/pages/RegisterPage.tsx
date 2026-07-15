import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlowButton, GlassCard, GlassSelect, SparkleButton, WaveText, EmailVerificationSnackbar } from '@/components/ui'
import { EyeIcon } from '@/components/icons'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { useFadeIn } from '@/hooks/useFadeIn'

function UserIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="15.6473" cy="7.82311" r="5.21569" fill="#00B38C" />
      <ellipse cx="15.647" cy="22.1669" rx="9.12745" ry="5.21569" fill="#00B38C" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.3278 2.31055H19.6382C21.8165 2.31055 22.9057 2.31055 23.5824 2.98726C24.2591 3.66398 24.2591 4.75314 24.2591 6.93146V24.5487H25.4144C25.8929 24.5487 26.2808 24.9366 26.2808 25.4151C26.2808 25.8936 25.8929 26.2815 25.4144 26.2815H2.30978C1.83127 26.2815 1.44336 25.8936 1.44336 25.4151C1.44336 24.9366 1.83127 24.5487 2.30978 24.5487H3.46501V10.3971C3.46501 8.21883 3.46501 7.12967 4.14173 6.45295C4.81844 5.77623 5.9076 5.77623 8.08592 5.77623H12.7068C14.8852 5.77623 15.9743 5.77623 16.651 6.45295C17.3278 7.12967 17.3278 8.21883 17.3278 10.3971V24.5487H19.0606V10.3971L19.0606 10.2938C19.0607 9.29376 19.0608 8.3769 18.9606 7.63105C18.8501 6.80973 18.5903 5.94163 17.8763 5.22765C17.1624 4.51366 16.2943 4.25386 15.4729 4.14343C14.7376 4.04457 13.836 4.04328 12.8524 4.04338C12.9498 3.59602 13.1123 3.25851 13.3836 2.98726C14.0603 2.31055 15.1494 2.31055 17.3278 2.31055ZM6.06427 9.24192C6.06427 8.76341 6.45218 8.3755 6.9307 8.3755H13.8621C14.3406 8.3755 14.7285 8.76341 14.7285 9.24192C14.7285 9.72043 14.3406 10.1083 13.8621 10.1083H6.9307C6.45218 10.1083 6.06427 9.72043 6.06427 9.24192ZM6.06427 12.7076C6.06427 12.2291 6.45218 11.8412 6.9307 11.8412H13.8621C14.3406 11.8412 14.7285 12.2291 14.7285 12.7076C14.7285 13.1861 14.3406 13.574 13.8621 13.574H6.9307C6.45218 13.574 6.06427 13.1861 6.06427 12.7076ZM6.06427 16.1733C6.06427 15.6948 6.45218 15.3069 6.9307 15.3069H13.8621C14.3406 15.3069 14.7285 15.6948 14.7285 16.1733C14.7285 16.6518 14.3406 17.0397 13.8621 17.0397H6.9307C6.45218 17.0397 6.06427 16.6518 6.06427 16.1733ZM10.3964 21.083C10.8749 21.083 11.2628 21.4709 11.2628 21.9494V24.5487H9.52996V21.9494C9.52996 21.4709 9.91787 21.083 10.3964 21.083Z" fill="#00B38C" />
    </svg>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className={className} aria-hidden="true">
      <path d="M6.75 4.5 11.25 9l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function StepBadge({ step, total }: { step: number; total: number }) {
  return (
    <div className="h-[2.125rem] px-3.5 rounded-2xl border border-gfx-neutral-200 flex items-center">
      <span className="text-gfx-neutral-500 text-sm sm:text-base leading-tight">Step {step} of {total}</span>
    </div>
  )
}

function AccountTypeCard({ icon, title, description, onClick }: {
  icon: React.ReactNode
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="glass-card group relative flex-1 min-w-[8rem] max-w-[10.8125rem] aspect-[173/222] flex flex-col items-center rounded-2xl bg-gfx-green-800 cursor-pointer transition-all overflow-hidden shadow-[0px_2.8px_14px_rgba(0,0,0,0.03)]"
      aria-label={`Select ${title} account`}
    >
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-36 h-[8.4rem] rounded-full bg-[#40C99C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[68px]" aria-hidden="true" />
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-36 h-[8.4rem] rounded-full bg-[#40C99C] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[74px]" aria-hidden="true" />
      <div className="w-[4.125rem] h-[4.125rem] rounded-full bg-gfx-green-900 flex items-center justify-center relative z-10 mt-10">
        {icon}
      </div>
      <span className="text-white text-base leading-tight relative z-10 mt-3">{title}</span>
      <span className="text-gfx-neutral-400 text-sm sm:text-base text-center leading-tight relative z-10 mt-1">{description}</span>
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

const INPUT_CLASS = "w-full h-[2.875rem] rounded-3xl bg-gfx-green-800 border border-gfx-green-200 px-[1.625rem] text-white text-base placeholder:text-gfx-neutral-400 outline-none focus:border-gfx-green-500/50 transition-colors"

function SignInLink() {
  return (
    <p className="text-base leading-tight">
      <span className="text-gfx-neutral-400">Already have an account? </span>
      <Link to="/" className="text-white hover:underline">Sign In</Link>
    </p>
  )
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="w-full [&>button]:w-full">
      <SparkleButton onClick={onClick}>
        <ChevronRight className="rotate-180" />
        Back
      </SparkleButton>
    </div>
  )
}

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [accountType, setAccountType] = useState<'individual' | 'corporate'>('individual')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showEmailSnackbar, setShowEmailSnackbar] = useState(false)
  const navigate = useNavigate()

  const handleCreateAccount = () => {
    setShowEmailSnackbar(true)
    setTimeout(() => navigate('/'), 5000)
  }

  return (
    <AuthLayout>
      <EmailVerificationSnackbar open={showEmailSnackbar} onClose={() => setShowEmailSnackbar(false)} />

      {step === 1 && (
        <Step1
          setAccountType={setAccountType}
          onContinue={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          accountType={accountType}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showConfirmPassword={showConfirmPassword}
          setShowConfirmPassword={setShowConfirmPassword}
          onContinue={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && accountType === 'corporate' && (
        <Step3Corporate onBack={() => setStep(2)} onCreateAccount={handleCreateAccount} />
      )}
      {step === 3 && accountType === 'individual' && (
        <Step3Personal onBack={() => setStep(2)} onCreateAccount={handleCreateAccount} />
      )}
    </AuthLayout>
  )
}

function Step1({ setAccountType, onContinue }: {
  setAccountType: (t: 'individual' | 'corporate') => void
  onContinue: () => void
}) {
  const fadeRef = useFadeIn()

  return (
    <div ref={fadeRef} className="w-full max-w-xl px-4 sm:px-0 flex flex-col items-center gap-6">
      <WaveText as="h1" className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-tight text-center">Create Account</WaveText>

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-full flex flex-col items-center gap-12 px-6 sm:px-25 py-8 sm:py-10 bg-transparent">
        <div className="w-full flex items-center justify-between">
          <span className="text-gfx-neutral-600 text-base leading-tight">Account Type</span>
          <StepBadge step={1} total={3} />
        </div>

        <div className="w-full flex gap-2.5 justify-center" role="group" aria-label="Account type selection">
          <AccountTypeCard
            icon={<UserIcon />}
            title="Individual"
            description="Personal trading account"
            onClick={() => { setAccountType('individual'); onContinue() }}
          />
          <AccountTypeCard
            icon={<BuildingIcon />}
            title="Corporate"
            description="Business trading account"
            onClick={() => { setAccountType('corporate'); onContinue() }}
          />
        </div>

        <SignInLink />
      </GlassCard>
    </div>
  )
}

function Step2({ accountType, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword, onContinue, onBack }: {
  accountType: 'individual' | 'corporate'
  showPassword: boolean
  setShowPassword: (v: boolean) => void
  showConfirmPassword: boolean
  setShowConfirmPassword: (v: boolean) => void
  onContinue: () => void
  onBack: () => void
}) {
  const title = accountType === 'corporate' ? 'Corporate Account' : 'Personal Account'
  const fadeRef = useFadeIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const isValid = email.trim() !== '' && password.trim() !== '' && confirmPassword.trim() !== ''

  return (
    <div ref={fadeRef} className="w-full max-w-xl px-4 sm:px-0 flex flex-col items-center gap-6">
      <WaveText as="h1" className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-tight text-center">{title}</WaveText>
      <WaveText as="p" className="text-gfx-neutral-500 text-sm leading-[1.175rem] text-center" delay={0.4} stagger={0.015}>Enter your account credentials</WaveText>

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-full flex flex-col items-center gap-3 px-6 sm:px-25 py-8 sm:py-10 bg-transparent">
        <div className="w-full flex items-center justify-between">
          <span className="text-gfx-neutral-600 text-base leading-tight">Account Info</span>
          <StepBadge step={2} total={3} />
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Email" autoComplete="email" aria-label="Email address" className={INPUT_CLASS} value={email} onChange={e => setEmail(e.target.value)} />

          <div className="w-full relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="new-password"
              aria-label="Password"
              className={`${INPUT_CLASS} pr-13`}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0" aria-label={showPassword ? 'Hide password' : 'Show password'}>
              <EyeIcon open={showPassword} />
            </button>
          </div>

          <div className="w-full relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              autoComplete="new-password"
              aria-label="Confirm password"
              className={`${INPUT_CLASS} pr-13`}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0" aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}>
              <EyeIcon open={showConfirmPassword} />
            </button>
          </div>

          <input type="text" placeholder="Referral Code (Optional)" aria-label="Referral code" className={INPUT_CLASS} />
        </form>

        <div className="w-full flex flex-col gap-2">
          <GlowButton label="Continue" width="100%" onClick={onContinue} disabled={!isValid} />
          <BackButton onClick={onBack} />
        </div>

        <SignInLink />
      </GlassCard>
    </div>
  )
}

function Step3Corporate({ onBack, onCreateAccount }: { onBack: () => void; onCreateAccount: () => void }) {
  const fadeRef = useFadeIn()
  const [companyName, setCompanyName] = useState('')
  const [regNumber, setRegNumber] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const isValid = companyName.trim() !== '' && regNumber.trim() !== '' && businessType !== '' && address.trim() !== '' && country !== ''

  return (
    <div ref={fadeRef} className="w-full max-w-xl px-4 sm:px-0 flex flex-col items-center gap-6">
      <WaveText as="h1" className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-tight text-center">Corporate Account</WaveText>
      <WaveText as="p" className="text-gfx-neutral-500 text-sm leading-[1.175rem] text-center" delay={0.4} stagger={0.015}>Complete your company information</WaveText>

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-full flex flex-col items-center gap-3 px-6 sm:px-25 py-8 sm:py-10 bg-transparent">
        <div className="w-full flex items-center justify-between">
          <span className="text-gfx-neutral-600 text-base leading-tight">Company Info</span>
          <StepBadge step={3} total={3} />
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Company Name" aria-label="Company name" className={INPUT_CLASS} value={companyName} onChange={e => setCompanyName(e.target.value)} />
          <input type="text" placeholder="Registration Number" aria-label="Registration number" className={INPUT_CLASS} value={regNumber} onChange={e => setRegNumber(e.target.value)} />
          <GlassSelect options={BUSINESS_TYPE_OPTIONS} placeholder="Business Type" onChange={setBusinessType} />
          <input type="text" placeholder="Business Address" aria-label="Business address" className={INPUT_CLASS} value={address} onChange={e => setAddress(e.target.value)} />
          <GlassSelect options={COUNTRY_OPTIONS} placeholder="Country of Incorporation" onChange={setCountry} />
        </form>

        <div className="w-full flex flex-col gap-2">
          <GlowButton label="Create Account" width="100%" disabled={!isValid} onClick={onCreateAccount} />
          <BackButton onClick={onBack} />
        </div>

        <SignInLink />
      </GlassCard>
    </div>
  )
}

function Step3Personal({ onBack, onCreateAccount }: { onBack: () => void; onCreateAccount: () => void }) {
  const fadeRef = useFadeIn()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const isValid = firstName.trim() !== '' && lastName.trim() !== '' && phone.trim() !== '' && address.trim() !== '' && country.trim() !== ''

  return (
    <div ref={fadeRef} className="w-full max-w-xl px-4 sm:px-0 flex flex-col items-center gap-6">
      <WaveText as="h1" className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-tight text-center">Personal Account</WaveText>
      <WaveText as="p" className="text-gfx-neutral-500 text-sm leading-[1.175rem] text-center" delay={0.4} stagger={0.015}>Complete your personal information</WaveText>

      <GlassCard variant="light" divider="none" rounded="1.25rem" className="w-full flex flex-col items-center gap-3 px-6 sm:px-25 py-8 sm:py-10 bg-transparent">
        <div className="w-full flex items-center justify-between">
          <span className="text-gfx-neutral-600 text-base leading-tight">Personal Info</span>
          <StepBadge step={3} total={3} />
        </div>

        <form className="w-full flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
          <div className="flex flex-col sm:flex-row gap-[0.375rem]">
            <input type="text" placeholder="First Name" autoComplete="given-name" aria-label="First name" className={`flex-1 ${INPUT_CLASS}`} value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input type="text" placeholder="Last Name" autoComplete="family-name" aria-label="Last name" className={`flex-1 ${INPUT_CLASS}`} value={lastName} onChange={e => setLastName(e.target.value)} />
          </div>
          <input type="tel" placeholder="Phone*" autoComplete="tel" aria-label="Phone number" className={INPUT_CLASS} value={phone} onChange={e => setPhone(e.target.value)} />
          <input type="text" placeholder="Address*" autoComplete="street-address" aria-label="Address" className={INPUT_CLASS} value={address} onChange={e => setAddress(e.target.value)} />
          <input type="text" placeholder="Country*" autoComplete="country-name" aria-label="Country" className={INPUT_CLASS} value={country} onChange={e => setCountry(e.target.value)} />
        </form>

        <div className="w-full flex flex-col gap-2">
          <GlowButton label="Create Account" width="100%" disabled={!isValid} onClick={onCreateAccount} />
          <BackButton onClick={onBack} />
        </div>

        <SignInLink />
      </GlassCard>
    </div>
  )
}
