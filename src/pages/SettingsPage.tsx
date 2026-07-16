import { useState, useRef, type ReactNode } from 'react'
import { GlassCard, GlassInput, ModeToggle, GlowEllipse, StatCard, SparkleButton, GlowButton } from '@/components/ui'
import { TwoFactorModal } from '@/components/modals/TwoFactorModal'
import { ChangePictureModal } from '@/components/modals/ChangePictureModal'
import { ChangePasswordModal } from '@/components/modals/ChangePasswordModal'
import { ChangeEmailModal } from '@/components/modals/ChangeEmailModal'
import { CloseAccountModal } from '@/components/modals/CloseAccountModal'
import { TopBar } from '@/components/dashboard/TopBar'
import { useSidebar } from '@/layouts/RootLayout'

const TABS = ['Profile', 'Verification', 'Rewards', 'Support', 'Security', 'Settings'] as const

function CameraAddIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M7 0.875C4.58375 0.875 2.625 2.83375 2.625 5.25C2.625 6.17318 2.92018 7.02663 3.42012 7.72494L0.822453 10.3226C0.593849 10.5512 0.593849 10.9238 0.822453 11.1524C1.05106 11.381 1.42394 11.381 1.65255 11.1524L4.25022 8.55474C4.94853 9.05468 5.80198 9.34986 6.72516 9.34986C6.81696 9.34986 6.90828 9.34703 6.99906 9.34141V10.5C6.99906 10.8228 7.26127 11.085 7.58406 11.085C7.90686 11.085 8.16906 10.8228 8.16906 10.5V9.05986C9.78687 8.52211 10.9503 7.02437 10.9503 5.25C10.9503 3.04886 9.20144 1.3 7 1.3V0.875ZM7 8.17486C8.6154 8.17486 9.92528 6.86498 9.92528 5.24958C9.92528 3.63418 8.6154 2.3243 7 2.3243C5.3846 2.3243 4.07472 3.63418 4.07472 5.24958C4.07472 6.86498 5.3846 8.17486 7 8.17486Z" fill="#0C1311" />
      <path d="M8.16906 12.25C8.16906 11.9272 7.90686 11.665 7.58406 11.665C7.26127 11.665 6.99906 11.9272 6.99906 12.25V13.125H6.125C5.80221 13.125 5.54 13.3872 5.54 13.71C5.54 14.0328 5.80221 14.295 6.125 14.295H6.99906V13.125H8.16906V14.295H8.75C9.07279 14.295 9.335 14.0328 9.335 13.71C9.335 13.3872 9.07279 13.125 8.75 13.125H8.16906V12.25Z" fill="#0C1311" />
    </svg>
  )
}

function WarningTriangleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
      <path d="M7.14413 2.97362C7.77763 1.87499 9.35687 1.87499 9.99037 2.97362L15.0326 11.7236C15.6516 12.7972 14.8766 14.1236 13.6097 14.1236H3.52478C2.25787 14.1236 1.48288 12.7972 2.10188 11.7236L7.14413 2.97362Z" fill="#E29D58" />
      <path d="M8.56725 5.99861V9.06111" stroke="#0C1311" strokeWidth="1.14844" strokeLinecap="round" />
      <circle cx="8.56725" cy="11.0924" r="0.574219" fill="#0C1311" />
    </svg>
  )
}

function IdIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M1.625 3.25C1.625 2.35254 2.35254 1.625 3.25 1.625H9.75C10.6475 1.625 11.375 2.35254 11.375 3.25V9.75C11.375 10.6475 10.6475 11.375 9.75 11.375H3.25C2.35254 11.375 1.625 10.6475 1.625 9.75V3.25ZM4.875 5.6875C5.32373 5.6875 5.6875 5.32373 5.6875 4.875C5.6875 4.42627 5.32373 4.0625 4.875 4.0625C4.42627 4.0625 4.0625 4.42627 4.0625 4.875C4.0625 5.32373 4.42627 5.6875 4.875 5.6875ZM4.875 7.3125C4.19964 7.3125 3.59882 7.6525 3.25 8.17C3.25 7.494 3.79904 6.945 4.475 6.945H5.275C5.95096 6.945 6.5 7.494 6.5 8.17C6.15118 7.6525 5.55036 7.3125 4.875 7.3125ZM7.3125 5.28125H9.75V4.46875H7.3125V5.28125ZM7.3125 7.3125H9.75V6.5H7.3125V7.3125Z" fill="#808080" />
    </svg>
  )
}

function KycIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.5 1.625C3.80761 1.625 1.625 3.80761 1.625 6.5C1.625 9.19239 3.80761 11.375 6.5 11.375C9.19239 11.375 11.375 9.19239 11.375 6.5C11.375 3.80761 9.19239 1.625 6.5 1.625ZM6.5 4.0625C5.82564 4.0625 5.28125 4.60689 5.28125 5.28125C5.28125 5.95561 5.82564 6.5 6.5 6.5C7.17436 6.5 7.71875 5.95561 7.71875 5.28125C7.71875 4.60689 7.17436 4.0625 6.5 4.0625ZM4.875 8.9375C4.875 7.93962 5.50213 7.3125 6.5 7.3125C7.49787 7.3125 8.125 7.93962 8.125 8.9375H4.875Z" fill="#808080" />
    </svg>
  )
}

function PartnerDotIcon() {
  return (
    <div className="w-1.5 h-1.5 rounded-full bg-gfx-green-300" />
  )
}

function PammIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M4.0625 9.75V6.5M6.5 9.75V3.25M8.9375 9.75V5.6875" stroke="#C8AFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FileTextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.16667 2.5C3.24619 2.5 2.5 3.24619 2.5 4.16667V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V4.16667C17.5 3.24619 16.7538 2.5 15.8333 2.5H4.16667ZM5.83333 6.66667H14.1667V5.83333H5.83333V6.66667ZM5.83333 10H14.1667V9.16667H5.83333V10ZM5.83333 13.3333H10.8333V12.5H5.83333V13.3333Z" fill="white" />
    </svg>
  )
}

function FolderCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 4C2 2.89543 2.89543 2 4 2H6.34315C6.87358 2 7.38229 2.21071 7.75736 2.58579L8.58579 3.41421C8.96086 3.78929 9.46957 4 10 4H12C13.1046 4 14 4.89543 14 6V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4ZM10.7071 8.70711L7.5 11.9142L5.29289 9.70711L6.70711 8.29289L7.5 9.08579L9.29289 7.29289L10.7071 8.70711Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

function UploadIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <rect width="36" height="36" rx="8" fill="var(--color-gfx-green-900)" />
      <path d="M18 12V24M18 12L13 17M18 12L23 17" stroke="var(--color-gfx-green-300)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M7 1.75C4.1005 1.75 1.75 4.1005 1.75 7C1.75 9.8995 4.1005 12.25 7 12.25C9.8995 12.25 12.25 9.8995 12.25 7C12.25 4.1005 9.8995 1.75 7 1.75ZM7.4375 4.375V6.8189L9.05923 8.44063L8.19077 9.30937L6.5625 7.6811V4.375H7.4375Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

function CloseSquareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM8.96965 8.96967C9.26254 8.67678 9.73742 8.67678 10.0303 8.96967L12 10.9394L13.9696 8.96969C14.2625 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0303L13.0606 12L15.0303 13.9697C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73744 15.3232 9.26256 15.3232 8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697L10.9393 12L8.96965 10.0303C8.67676 9.73744 8.67676 9.26256 8.96965 8.96967Z" fill="#D46356"/>
    </svg>
  )
}

function EyeScanIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M4 7C4 5.34315 5.34315 4 7 4H8V6H7C6.44772 6 6 6.44772 6 7V8H4V7ZM16 4H17C18.6569 4 20 5.34315 20 7V8H18V7C18 6.44772 17.5523 6 17 6H16V4ZM4 16V17C4 18.6569 5.34315 20 7 20H8V18H7C6.44772 18 6 17.5523 6 17V16H4ZM18 16V17C18 17.5523 17.5523 18 17 18H16V20H17C18.6569 20 20 18.6569 20 17V16H18ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

interface ProfileBadgeProps {
  icon: React.ReactNode
  label: string
  variant?: 'default' | 'green' | 'purple'
}

function ProfileBadge({ icon, label, variant = 'default' }: ProfileBadgeProps) {
  const styles = {
    default: 'bg-gfx-green-800 border-gfx-neutral-250 text-gfx-neutral-400',
    green: 'bg-gfx-green-800 border-gfx-green-200 text-gfx-green-300',
    purple: 'bg-gfx-purple-bg border-gfx-purple-border text-gfx-purple-accent',
  }

  return (
    <div className={`inline-flex items-center gap-2 h-8 px-3.5 rounded-full border ${styles[variant]}`}>
      {icon}
      <span className="text-sm font-acid leading-tight whitespace-nowrap">{label}</span>
    </div>
  )
}

interface KycStatusItemProps {
  title: string
  subtitle: string
}

function KycStatusItem({ title, subtitle }: KycStatusItemProps) {
  return (
    <GlassCard variant="light" divider="none" className="!rounded-[1.125rem] !p-0 h-[4.6875rem] !shadow-none" style={{ background: '#0C1311' }}>
      <div className="flex items-center gap-2.5 px-6 h-full">
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.76181 7.62273C5.82898 3.95758 6.86257 2.125 8.49935 2.125C10.1361 2.125 11.1697 3.95757 13.2369 7.62272L13.4945 8.07944C15.2123 11.1252 16.0712 12.648 15.2949 13.7615C14.5186 14.875 12.5981 14.875 8.75694 14.875H8.24175C4.40062 14.875 2.48005 14.875 1.70378 13.7615C0.927508 12.648 1.78641 11.1252 3.50422 8.07944L3.76181 7.62273ZM8.49935 5.13542C8.79275 5.13542 9.0306 5.37327 9.0306 5.66667V9.20833C9.0306 9.50173 8.79275 9.73958 8.49935 9.73958C8.20595 9.73958 7.9681 9.50173 7.9681 9.20833V5.66667C7.9681 5.37327 8.20595 5.13542 8.49935 5.13542ZM8.49935 12.0417C8.89055 12.0417 9.20768 11.7245 9.20768 11.3333C9.20768 10.9421 8.89055 10.625 8.49935 10.625C8.10815 10.625 7.79102 10.9421 7.79102 11.3333C7.79102 11.7245 8.10815 12.0417 8.49935 12.0417Z" fill="#808080" />
        </svg>
        <div>
          <p className="text-white text-base font-acid font-medium leading-relaxed">{title}</p>
          <p className="text-gfx-neutral-400 text-sm font-acid leading-tight">{subtitle}</p>
        </div>
      </div>
    </GlassCard>
  )
}

const KYC_STEPS = [
  { label: 'Identity', subtitle: 'Government-issued ID', icon: <FileTextIcon /> },
  { label: 'Address', subtitle: 'Proof of residence', icon: <MapPointIcon /> },
  { label: 'Review', subtitle: 'Admin verification', icon: <EyeScanIcon /> },
] as const

const REQUIREMENTS = [
  'Upload a valid passport, driver\'s license, or national ID card',
  'Ensure all four corners are visible',
  'Make sure text is clearly readable',
  'File must be JPG, PNG, or PDF format',
] as const

const TRADING_FEATURES = [
  'Trading Accounts (Lived)',
  'Crypto Deposits',
  'Crypto Withdrawals',
  'Fiat Deposits',
  'Fiat Withdrawals (Limits)',
] as const

function MapPointIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.99967 1.66699C6.31778 1.66699 3.33301 5.00248 3.33301 8.75033C3.33301 12.4688 5.46078 16.5107 8.78056 18.0624C9.55446 18.4241 10.4449 18.4241 11.2188 18.0624C14.5386 16.5107 16.6663 12.4688 16.6663 8.75033C16.6663 5.00248 13.6816 1.66699 9.99967 1.66699ZM9.99967 10.0003C10.9201 10.0003 11.6663 9.25413 11.6663 8.33366C11.6663 7.41318 10.9201 6.66699 9.99967 6.66699C9.0792 6.66699 8.33301 7.41318 8.33301 8.33366C8.33301 9.25413 9.0792 10.0003 9.99967 10.0003Z" fill="#808080"/>
    </svg>
  )
}

function StepperGradientRing() {
  return (
    <svg className="absolute inset-0" width="62" height="62" viewBox="0 0 62 62" fill="none">
      <circle cx="31" cy="31" r="30.5" stroke="url(#stepperGrad)" strokeOpacity="0.5" strokeLinecap="round"/>
      <defs>
        <linearGradient id="stepperGrad" x1="-6.658" y1="0.276" x2="75.105" y2="16.896" gradientUnits="userSpaceOnUse">
          <stop offset="0.2" stopColor="#00B38C"/>
          <stop offset="0.477" stopColor="#064B34"/>
          <stop offset="0.966" stopColor="#00B38C"/>
        </linearGradient>
      </defs>
    </svg>
  )
}

function VerificationStepper({ activeStep = 0 }: { activeStep?: number }) {
  return (
    <div className="flex items-start justify-center gap-0">
      {KYC_STEPS.map((step, i) => (
        <div key={step.label} className="flex items-start">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-[3.875rem] h-[3.875rem]">
              {i <= activeStep ? (
                <>
                  <StepperGradientRing />
                  <div className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 6px rgba(0,179,140,0.3)' }} />
                </>
              ) : (
                <svg className="absolute inset-0" width="62" height="62" viewBox="0 0 62 62" fill="none">
                  <circle cx="31" cy="31" r="31" fill="#09241C"/>
                </svg>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                {step.icon}
              </div>
            </div>
            <div className="text-center">
              <p className={`text-base font-acid font-medium ${i <= activeStep ? 'text-white' : 'text-gfx-neutral-400'}`}>{step.label}</p>
              <p className="text-gfx-neutral-400 text-sm font-acid">{step.subtitle}</p>
            </div>
          </div>
          {i < KYC_STEPS.length - 1 && (
            <div className="w-[11.8125rem] h-px mt-[1.9375rem] mx-4 bg-[#303030]" />
          )}
        </div>
      ))}
    </div>
  )
}

function UploadSquareIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 18C3 10.9289 3 7.3934 5.1967 5.1967C7.3934 3 10.9289 3 18 3C25.0711 3 28.6066 3 30.8033 5.1967C33 7.3934 33 10.9289 33 18C33 25.0711 33 28.6066 30.8033 30.8033C28.6066 33 25.0711 33 18 33C10.9289 33 7.3934 33 5.1967 30.8033C3 28.6066 3 25.0711 3 18ZM18 26.625C18.6213 26.625 19.125 26.1213 19.125 25.5V17.716L21.7045 20.2955C22.1438 20.7348 22.8562 20.7348 23.2955 20.2955C23.7348 19.8562 23.7348 19.1438 23.2955 18.7045L18.7955 14.2045C18.5845 13.9935 18.2984 13.875 18 13.875C17.7016 13.875 17.4155 13.9935 17.2045 14.2045L12.7045 18.7045C12.2652 19.1438 12.2652 19.8562 12.7045 20.2955C13.1438 20.7348 13.8562 20.7348 14.2955 20.2955L16.875 17.716V25.5C16.875 26.1213 17.3787 26.625 18 26.625ZM12 11.625C11.3787 11.625 10.875 11.1213 10.875 10.5C10.875 9.87868 11.3787 9.375 12 9.375H24C24.6213 9.375 25.125 9.87868 25.125 10.5C25.125 11.1213 24.6213 11.625 24 11.625H12Z" fill="#808080"/>
    </svg>
  )
}

function IdentityDetailCard() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  return (
    <GlassCard variant="light" divider="none" className="!rounded-[1.16rem] !bg-[#0C1311] pb-8 overflow-hidden">
      <div className="flex relative">
        {/* Left side — Identity info + Requirements */}
        <div className="flex-1 p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[3.875rem] h-[3.875rem] rounded-full bg-[#09241C] flex items-center justify-center">
              <FileTextIcon />
            </div>
            <div>
              <p className="text-white text-base font-acid font-medium">Identity</p>
              <p className="text-gfx-neutral-400 text-base font-acid">Government-issued ID</p>
            </div>
          </div>

          <p className="text-white text-base font-acid font-medium mb-4">Requirements</p>
          <div className="flex flex-col gap-2">
            {REQUIREMENTS.map((req) => (
              <div key={req} className="flex items-start gap-3">
                <FolderCheckIcon />
                <p className="text-gfx-neutral-400 text-base font-acid leading-relaxed">{req}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-[#09241C] rounded-[1.25rem] px-8 py-7">
            <p className="text-gfx-green-300 text-base font-acid leading-relaxed">
              Tip: Take the photo in a well-lit area without glare or shadows
            </p>
          </div>
        </div>

        {/* Vertical gradient divider */}
        <div className="w-px self-stretch my-20 shrink-0" style={{ background: 'linear-gradient(to bottom, #064B34 0%, #0C1311 100%)' }} />

        {/* Right side — Upload area */}
        <div className="flex-1 p-10 flex flex-col items-center justify-center gap-10">
          <div className="flex items-center justify-center gap-4">
            <UploadSquareIcon />
            <div>
              <p className="text-white text-base font-acid">Upload Your Document</p>
              <p className="text-gfx-neutral-400 text-base font-acid">Drag and drop or click to browse</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <GlowButton
              label="Choose File"
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.5 9C1.5 13.1421 4.85786 16.5 9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9ZM11.6477 9.35225C11.8674 9.57192 11.8674 9.92808 11.6477 10.1477L9.39775 12.3977C9.17808 12.6174 8.82192 12.6174 8.60225 12.3977L6.35225 10.1477C6.13258 9.92808 6.13258 9.57192 6.35225 9.35225C6.57192 9.13258 6.92808 9.13258 7.14775 9.35225L8.4375 10.642V6C8.4375 5.68934 8.68934 5.4375 9 5.4375C9.31066 5.4375 9.5625 5.68934 9.5625 6V10.642L10.8523 9.35225C11.0719 9.13258 11.4281 9.13258 11.6477 9.35225Z" fill="black" />
                </svg>
              }
              width={193}
              height={44}
              onClick={() => fileInputRef.current?.click()}
            />
            <input ref={fileInputRef} type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
            <p className="text-gfx-neutral-400 text-base font-acid">JPG, PNG or PDF • Max 10MB</p>
          </div>

          <div className="flex items-center justify-center gap-3 bg-[#09241C] rounded-[1.375rem] px-3 py-2.5 w-fit mx-auto">
            <ClockIcon />
            <p className="text-gfx-neutral-400 text-sm font-acid">Verification typically takes within 24 hours</p>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

function TradingFeaturesTable() {
  return (
    <div className="relative overflow-hidden">
      <div className="px-[7.875rem] py-12">
        <h3 className="text-white text-2xl font-acid leading-normal">Verification – Trading</h3>
      </div>

      <div className="flex items-center justify-between px-[7.1875rem] pb-4">
        <span className="text-[#00B38C] text-base font-acid font-medium">Features</span>
        <span className="text-[#00B38C] text-base font-acid font-medium">Allowed</span>
      </div>
      <div className="w-full h-px bg-[#09241C]" />

      {TRADING_FEATURES.map((feature, i) => (
        <div key={feature}>
          <div className="flex items-center justify-between px-[7.1875rem] py-[1.3125rem]">
            <span className="text-[#808080] text-base font-acid font-medium">{feature}</span>
            <CloseSquareIcon />
          </div>
          {i < TRADING_FEATURES.length - 1 && <div className="w-full h-px bg-[#09241C]" />}
        </div>
      ))}
    </div>
  )
}

function GiftIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <path d="M10.667 29.333v24c0 2.946 2.388 5.334 5.333 5.334h32c2.946 0 5.333-2.388 5.333-5.334v-24" stroke="#808080" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18.667h48c1.473 0 2.667 1.194 2.667 2.666v8H5.333v-8c0-1.472 1.194-2.666 2.667-2.666Z" stroke="#808080" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 58.667V18.667" stroke="#808080" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 18.667h-9.333c-2.946 0-5.334-2.388-5.334-5.334 0-2.945 2.388-5.333 5.334-5.333C28.444 8 32 13.333 32 18.667Z" stroke="#808080" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M32 18.667h9.333c2.946 0 5.334-2.388 5.334-5.334 0-2.945-2.388-5.333-5.334-5.333C35.556 8 32 13.333 32 18.667Z" stroke="#808080" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RewardsTab() {
  return (
    <GlassCard className="mt-10 !rounded-[1.16rem] h-[29.6875rem] mx-auto">
      <div className="relative h-full overflow-hidden">
        <h3 className="text-white text-2xl font-acid leading-normal px-30 pt-10">My Rewards</h3>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mt-4">
            <GiftIcon />
          </div>
          <p className="text-gfx-neutral-400 text-base font-acid font-medium mt-6">No promotions found</p>
          <p className="text-gfx-neutral-400 text-base font-acid font-medium mt-3">Use a promo code when signing up to get exclusive bonuses!</p>
        </div>
        <GlowEllipse className="!w-[20rem] !h-[10rem] bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 !blur-[5rem] opacity-60" />
      </div>
    </GlassCard>
  )
}

function ChatDialogIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22 8.5C22 4.91015 19.0899 2 15.5 2C13.4171 2 11.5631 2.9823 10.3735 4.50721C15.4471 4.70336 19.5 8.87838 19.5 14C19.5 14.1103 19.4981 14.2202 19.4944 14.3296L19.8267 14.4185C20.793 14.677 21.677 13.793 21.4185 12.8267L21.2911 12.3506C21.1882 11.9661 21.2501 11.5598 21.4155 11.1977C21.7908 10.376 22 9.46242 22 8.5Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M18 14C18 18.4183 14.4183 22 10 22C8.76449 22 7.5944 21.7199 6.54976 21.2198C6.19071 21.0479 5.78393 20.9876 5.39939 21.0904L4.17335 21.4185C3.20701 21.677 2.32295 20.793 2.58151 19.8267L2.90955 18.6006C3.01245 18.2161 2.95209 17.8093 2.7802 17.4502C2.28008 16.4056 2 15.2355 2 14C2 9.58172 5.58172 6 10 6C14.4183 6 18 9.58172 18 14ZM6.5 15C7.05228 15 7.5 14.5523 7.5 14C7.5 13.4477 7.05228 13 6.5 13C5.94772 13 5.5 13.4477 5.5 14C5.5 14.5523 5.94772 15 6.5 15ZM10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15ZM13.5 15C14.0523 15 14.5 14.5523 14.5 14C14.5 13.4477 14.0523 13 13.5 13C12.9477 13 12.5 13.4477 12.5 14C12.5 14.5523 12.9477 15 13.5 15Z" fill="white"/>
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V5ZM5.5 7.5L12 12.5L18.5 7.5L17.5 6.5L12 10.5L6.5 6.5L5.5 7.5Z" fill="white" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" fill="white" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" fill="white" />
    </svg>
  )
}

function HelpCenterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-.004 4c-1.657 0-3 1.343-3 3h2c0-.552.448-1 1-1s1 .448 1 1c0 .374-.187.724-.5.928l-.625.375A2.498 2.498 0 0 0 10.996 12.5V13h2v-.5c0-.374.187-.724.5-.928l.625-.375a2.998 2.998 0 0 0 .875-4.197c-.625-.883-1.66-1.5-2.996-1.5h-.004ZM11 15v2h2v-2h-2Z" fill="white" />
    </svg>
  )
}


function SupportContactCard({ icon, title, subtitle, action }: { icon: ReactNode; title: string; subtitle: string; action?: string }) {
  return (
    <GlassCard variant="light" divider="none" className="!rounded-[1.875rem] !p-0" style={{ background: '#0C1311' }}>
      <div className="flex items-center gap-5 px-5 py-6">
        <div className="w-[3.375rem] h-[3.375rem] rounded-[0.625rem] bg-[#021B13] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="flex flex-col">
          <p className="text-white text-2xl font-acid">{title}</p>
          <p className="text-[#808080] text-base font-acid">{subtitle}</p>
          {action && <p className="text-[#10BC83] text-base font-acid">{action}</p>}
        </div>
      </div>
    </GlassCard>
  )
}

function SupportTab() {
  return (
    <GlassCard className="mt-10 !rounded-[1.16rem] mx-auto" style={{ background: '#0C1311' }}>
      <div className="relative overflow-hidden px-30 pt-12 pb-15">
        <h3 className="text-white text-2xl font-acid leading-normal mb-8">Contact support</h3>
        <div className="grid grid-cols-2 gap-5 relative z-10">
          <SupportContactCard icon={<ChatDialogIcon />} title="Live chat" subtitle="Available 24/7" action="Start  Live Chat" />
          <SupportContactCard icon={<EnvelopeIcon />} title="Email Support" subtitle="support@genesisfxmarkets.com" />
          <SupportContactCard icon={<WhatsappIcon />} title="Whatsapp" subtitle="Quick chat support" />
          <SupportContactCard icon={<HelpCenterIcon />} title="Help Center" subtitle="Browse common questions" />
        </div>
      </div>
    </GlassCard>
  )
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.378 5.082A1 1 0 0 0 3 6v5c0 6.075 3.925 9.684 8.663 11.876a.75.75 0 0 0 .674 0C17.075 20.684 21 17.075 21 11V6a1 1 0 0 0-.378-.918l-8.5-5a.75.75 0 0 0-.744 0l-8.5 5h.5ZM12 8a2 2 0 0 0-2 2c0 .74.402 1.387 1 1.732V14a1 1 0 1 0 2 0v-2.268A2 2 0 0 0 12 8Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

function SmartphoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M7 3C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H7ZM12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

function ToggleSwitch({ enabled = false, onClick }: { enabled?: boolean; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`w-11 h-[1.375rem] rounded-full relative cursor-pointer transition-colors ${enabled ? 'bg-gfx-green-300' : 'bg-[#09241c]'}`}>
      <div className={`w-[1.125rem] h-[1.125rem] rounded-full absolute top-px transition-all ${
        enabled ? 'right-px bg-white' : 'left-px bg-gfx-neutral-250'
      }`} />
    </div>
  )
}

function SecurityTab() {
  const [show2fa, setShow2fa] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  return (
    <GlassCard className="mt-10 !rounded-[1.16rem] mx-auto">
      <div className="relative overflow-hidden px-10 pt-10 pb-10">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%] w-[30.8125rem] h-[17.375rem] rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <h3 className="text-white text-2xl font-acid leading-normal">Security Settings</h3>
        <p className="text-gfx-neutral-400 text-base font-acid font-medium mt-2 mb-8">
          Manage your account security and two-factor authentication
        </p>

        <div className="border border-[#09241c] rounded-[2rem] overflow-hidden px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-[3.375rem] h-[3.375rem] rounded-[0.625rem] bg-[#021b13] flex items-center justify-center shrink-0">
                <ShieldIcon />
              </div>
              <div>
                <p className="text-white text-base font-acid font-medium">Two-Factor Authentication</p>
                <p className="text-gfx-neutral-400 text-base font-acid font-medium">Add an extra layer of security to your account</p>
              </div>
            </div>
            <ToggleSwitch onClick={() => setShow2fa(true)} />
          </div>
        </div>

        <TwoFactorModal open={show2fa} onClose={() => setShow2fa(false)} />

        <div className="bg-[#09241c] border border-[#09241c] rounded-[2rem] overflow-hidden px-8 py-8 mt-5">
          <div className="flex items-start gap-5">
            <div className="w-[3.375rem] h-[3.375rem] rounded-[0.625rem] bg-[#021b13] flex items-center justify-center shrink-0 mt-1">
              <SmartphoneIcon />
            </div>
            <div>
              <p className="text-white text-base font-acid font-medium mb-3">How it works</p>
              <ul className="text-gfx-neutral-400 text-base font-acid font-medium list-disc pl-6 space-y-1">
                <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                <li>Scan the QR code or enter the secret key</li>
                <li>Enter the 6-digit code to verify setup</li>
                <li>You'll need this code each time you sign in</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}


function SettingsTab() {
  const [aiCoachEnabled, setAiCoachEnabled] = useState(true)
  const [themeIndex, setThemeIndex] = useState(1)
  const [showChangePicture, setShowChangePicture] = useState(false)
  const [showChangePw, setShowChangePw] = useState(false)
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [showCloseAccount, setShowCloseAccount] = useState(false)

  return (
    <>
      <ChangePictureModal open={showChangePicture} onClose={() => setShowChangePicture(false)} />
      <div className="mt-10 bg-[#0C1311] border border-[#09241c] rounded-[2rem] px-8 pt-8 pb-4">
        <h3 className="text-white text-2xl font-acid mb-8">Settings</h3>

        <div className="divide-y divide-[#09241c]">
          <div className="flex items-center justify-between py-6 first:pt-0">
            <div className="mr-4">
              <p className="text-white text-base font-acid font-medium">Username</p>
              <p className="text-[#808080] text-base font-acid">Set your public username</p>
            </div>
            <div className="relative w-64 shrink-0">
              <input
                className="w-full bg-[#0C1311] border border-[#064b34] rounded-[1.875rem] px-6 py-3 text-base font-acid text-[#808080] outline-none focus:border-gfx-green-300 transition-colors"
                placeholder="@ Not set"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gfx-green-300 flex items-center justify-center hover:opacity-90 transition-opacity">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0C1311" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between py-6">
            <div>
              <p className="text-white text-base font-acid font-medium">Profile Picture</p>
              <p className="text-[#808080] text-base font-acid">Change your profile picture</p>
            </div>
            <SparkleButton onClick={() => setShowChangePicture(true)}>Change Picture</SparkleButton>
          </div>

          <div className="flex items-center justify-between py-6">
            <div>
              <p className="text-white text-base font-acid font-medium">Theme</p>
              <p className="text-[#808080] text-base font-acid">Choose your preferred theme</p>
            </div>
            <ModeToggle options={['Light', 'Dark', 'Auto']} activeIndex={themeIndex} onChange={setThemeIndex} />
          </div>

          <div className="flex items-center justify-between py-6">
            <div>
              <p className="text-white text-base font-acid font-medium">Change Language</p>
              <p className="text-[#808080] text-base font-acid">Choose your preferred language</p>
            </div>
            <SparkleButton>Change Language</SparkleButton>
          </div>

          <div className="flex items-center justify-between py-6">
            <div>
              <p className="text-white text-base font-acid font-medium">AI Coach Widget</p>
              <p className="text-[#808080] text-base font-acid">Show the floating AI Coach button on every page</p>
            </div>
            <ToggleSwitch enabled={aiCoachEnabled} onClick={() => setAiCoachEnabled(v => !v)} />
          </div>

          <div className="flex items-center justify-between py-6">
            <div>
              <p className="text-white text-base font-acid font-medium">Change Password</p>
              <p className="text-[#808080] text-base font-acid">Update your account password</p>
            </div>
            <SparkleButton onClick={() => setShowChangePw(true)}>Change Password</SparkleButton>
          </div>
          <ChangePasswordModal open={showChangePw} onClose={() => setShowChangePw(false)} />

          <div className="flex items-center justify-between py-6">
            <div>
              <p className="text-white text-base font-acid font-medium">Change Email</p>
              <p className="text-[#808080] text-base font-acid">Update your email address</p>
            </div>
            <SparkleButton onClick={() => setShowChangeEmail(true)}>Change Email</SparkleButton>
          </div>
          <ChangeEmailModal open={showChangeEmail} onClose={() => setShowChangeEmail(false)} />

          <div className="flex items-center justify-between py-6">
            <div>
              <p className="text-white text-base font-acid font-medium">Close Account</p>
              <p className="text-[#808080] text-base font-acid">Permanently delete your account and all data</p>
            </div>
            <SparkleButton onClick={() => setShowCloseAccount(true)}>Close Account</SparkleButton>
          </div>
          <CloseAccountModal open={showCloseAccount} onClose={() => setShowCloseAccount(false)} />
        </div>
      </div>
    </>
  )
}

function ProfileTab() {
  return (
    <>
      <GlassCard className="mt-10 !rounded-lg relative overflow-hidden">
        <div className="relative px-30 pt-10 pb-20">
          <h3 className="text-white text-2xl font-acid leading-normal mb-10">Personal Information</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <GlassInput label="First Name" placeholder="Joe" />
            <GlassInput label="First Name" placeholder="Cedeno" />
            <GlassInput label="Email Address" placeholder="joedoe@gmail.com" />
            <GlassInput label="Phone Number" placeholder="88565242" />
            <GlassInput label="Address" placeholder="3400 Ocee Street APT 1103" />
            <GlassInput label="Country" placeholder="United states" />
          </div>
        </div>
        <GlowEllipse className="!w-[20rem] !h-[10rem] bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 !blur-[5rem] opacity-60" />
      </GlassCard>

      <GlassCard className="mt-8 !rounded-lg relative overflow-hidden">
        <div className="relative z-10 px-30 pt-10 pb-20">
          <h3 className="text-white text-2xl font-acid leading-normal mb-8">KYC Status</h3>
          <div className="grid grid-cols-2 gap-x-8">
            <KycStatusItem title="Identify Document" subtitle="Not Submitted" />
            <KycStatusItem title="Proof of Address" subtitle="Not Submitted" />
          </div>
        </div>
        <GlowEllipse className="!w-[20rem] !h-[10rem] top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 !blur-[5rem] opacity-60" />
      </GlassCard>
    </>
  )
}

function VerificationTab() {
  return (
    <>
      <GlassCard className="mt-10 !rounded-[1.16rem]">
        <div className="relative overflow-hidden">
          {/* Bottom highlight glows */}
          <div className="absolute left-[29%] bottom-[-10rem] w-[30.8125rem] h-[17.375rem] rounded-full pointer-events-none" style={{ background: '#064B34', filter: 'blur(9.82rem)' }} aria-hidden="true" />
          <div className="absolute left-[29%] bottom-[-19rem] w-[30.8125rem] h-[17.375rem] rounded-full pointer-events-none" style={{ background: '#064B34', filter: 'blur(9.82rem)' }} aria-hidden="true" />

          <div className="px-30 pt-12 pb-0">
            <h3 className="text-white text-2xl font-acid leading-normal mb-10">KYC Verification Status</h3>
            <VerificationStepper activeStep={0} />
          </div>
          <div className="px-30 pb-10 pt-8 relative z-10">
            <IdentityDetailCard />
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mt-8 !rounded-[1.16rem] !pb-10">
        <TradingFeaturesTable />
      </GlassCard>
    </>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        menuOpen={sidebarOpen}
        onMenuClick={() => setSidebarOpen(v => !v)}
        breadcrumbItems={[
          { label: 'Settings', current: true },
        ]}
      />

      <div className="w-6xl mx-auto font-acid mt-[5%]">
      {/* Profile Header Card */}
      <div className="relative bg-[#0D1512] border border-gfx-green-300/12 rounded-[1.125rem] overflow-hidden">
        {/* Banner area */}
        <div
          className="relative h-[11.875rem] border-b border-white/5"
          style={{
            backgroundImage: 'url(/images/settings-hero-bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Avatar */}
          <div className="absolute left-10" style={{ top: '7.4375rem' }}>
            <div className="relative w-[7.25rem] h-[7.25rem] rounded-full bg-gfx-green-800 border-4 border-gfx-sidebar flex items-center justify-center overflow-hidden">
              <span className="text-white text-[1.975rem] font-acid font-bold relative z-10">JD</span>
              <div className="absolute w-[17.1875rem] h-[7.27rem] -bottom-[7rem] left-1/2 -translate-x-1/2 rounded-full pointer-events-none" style={{ background: '#00B38C', filter: 'blur(9.88rem)' }} aria-hidden="true" />
              <div className="absolute w-[8.6375rem] h-[6rem] -bottom-[7.64rem] left-1/2 -translate-x-[55%] rounded-full pointer-events-none" style={{ background: '#40C99C', filter: 'blur(8.7rem)' }} aria-hidden="true" />
              <div className="absolute w-[8.6375rem] h-[6rem] -bottom-[7.64rem] left-1/2 -translate-x-[55%] rounded-full pointer-events-none" style={{ background: '#40C99C', filter: 'blur(9.45rem)' }} aria-hidden="true" />
            </div>
            {/* Camera button */}
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gfx-green-300 border-[3px] border-gfx-green-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.99935 5.97917C7.24097 5.97917 7.43685 6.17504 7.43685 6.41667V7.14583H8.16602C8.40764 7.14583 8.60352 7.34171 8.60352 7.58333C8.60352 7.82496 8.40764 8.02083 8.16602 8.02083H7.43685V8.75C7.43685 8.99162 7.24097 9.1875 6.99935 9.1875C6.75772 9.1875 6.56185 8.99162 6.56185 8.75V8.02083H5.83268C5.59106 8.02083 5.39518 7.82496 5.39518 7.58333C5.39518 7.34171 5.59106 7.14583 5.83268 7.14583H6.56185V6.41667C6.56185 6.17504 6.75772 5.97917 6.99935 5.97917Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M5.70305 12.25H8.29565C10.1162 12.25 11.0265 12.25 11.6805 11.821C11.9635 11.6353 12.2066 11.3967 12.3958 11.1187C12.8327 10.4767 12.8327 9.58295 12.8327 7.79545C12.8327 6.00796 12.8327 5.11421 12.3958 4.47218C12.2066 4.19425 11.9635 3.95561 11.6805 3.7699C11.2603 3.49424 10.7342 3.39572 9.92885 3.3605C9.54452 3.3605 9.21361 3.07456 9.13824 2.70455C9.02518 2.14952 8.52882 1.75 7.95232 1.75H6.04638C5.46988 1.75 4.97352 2.14952 4.86046 2.70455C4.78509 3.07456 4.45418 3.3605 4.06985 3.3605C3.26446 3.39572 2.73842 3.49424 2.31824 3.7699C2.03516 3.95561 1.7921 4.19425 1.60295 4.47218C1.16602 5.11421 1.16602 6.00796 1.16602 7.79545C1.16602 9.58295 1.16602 10.4767 1.60295 11.1187C1.7921 11.3967 2.03516 11.6353 2.31824 11.821C2.97215 12.25 3.88245 12.25 5.70305 12.25ZM9.33268 7.58333C9.33268 8.872 8.28801 9.91667 6.99935 9.91667C5.71068 9.91667 4.66602 8.872 4.66602 7.58333C4.66602 6.29467 5.71068 5.25 6.99935 5.25C8.28801 5.25 9.33268 6.29467 9.33268 7.58333ZM10.4993 5.39583C10.2577 5.39583 10.0618 5.59171 10.0618 5.83333C10.0618 6.07496 10.2577 6.27083 10.4993 6.27083H11.0827C11.3243 6.27083 11.5202 6.07496 11.5202 5.83333C11.5202 5.59171 11.3243 5.39583 11.0827 5.39583H10.4993Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Profile info */}
        <div className="pl-44 pt-4 pb-6">
          <h2 className="text-white text-2xl font-acid leading-normal">Joe Doe</h2>
          <p className="text-gfx-neutral-400 text-sm font-acid leading-tight mt-2">joedoe@gmail.com</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <ProfileBadge icon={<IdIcon />} label="ID: f00e4a5d" />
            <ProfileBadge icon={<KycIcon />} label="KYC Required" />
            <ProfileBadge icon={<PartnerDotIcon />} label="Partner" variant="green" />
            <ProfileBadge icon={<PammIcon />} label="PAMM Manager" variant="purple" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-10 w-2xl">
        <ModeToggle
          options={[...TABS]}
          activeIndex={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {activeTab === 0 && <ProfileTab />}
      {activeTab === 1 && <VerificationTab />}
      {activeTab === 2 && <RewardsTab />}
      {activeTab === 3 && <SupportTab />}
      {activeTab === 4 && <SecurityTab />}
      {activeTab === 5 && <SettingsTab />}
      </div>
    </div>
  )
}
