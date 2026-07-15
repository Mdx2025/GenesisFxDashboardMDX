import { useState, useRef } from 'react'
import { GlassCard, GlassInput, ModeToggle } from '@/components/ui'
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
      <rect x="2" y="2" width="20" height="20" rx="5" fill="var(--color-gfx-red-surface)" />
      <path d="M9 9L15 15M15 9L9 15" stroke="var(--color-gfx-red-dark)" strokeWidth="1.5" strokeLinecap="round" />
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
    <GlassCard className="!p-0 h-[4.6875rem]">
      <div className="flex items-start gap-2.5 px-6 pt-5">
        <WarningTriangleIcon />
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
  { label: 'Address', subtitle: 'Proof of residence', icon: <EyeScanIcon /> },
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

function VerificationStepper({ activeStep = 0 }: { activeStep?: number }) {
  return (
    <div className="flex items-start justify-center gap-0">
      {KYC_STEPS.map((step, i) => (
        <div key={step.label} className="flex items-start">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-[3.875rem] h-[3.875rem] rounded-full flex items-center justify-center ${
              i <= activeStep
                ? 'bg-gfx-green-200 border-2 border-gfx-green-300'
                : 'bg-gfx-green-900 border-2 border-gfx-green-800'
            }`}>
              {step.icon}
            </div>
            <div className="text-center">
              <p className={`text-base font-acid font-medium ${i <= activeStep ? 'text-white' : 'text-gfx-neutral-400'}`}>{step.label}</p>
              <p className="text-gfx-neutral-400 text-sm font-acid">{step.subtitle}</p>
            </div>
          </div>
          {i < KYC_STEPS.length - 1 && (
            <div className={`w-[11.8125rem] h-px mt-[1.9375rem] mx-4 ${
              i < activeStep ? 'bg-gfx-green-300' : 'bg-gfx-neutral-350'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

function IdentityDetailCard() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  return (
    <div className="bg-gfx-green-800 border border-gfx-green-800 rounded-2xl overflow-hidden">
      <div className="flex">
        {/* Left side — Identity info + Requirements */}
        <div className="flex-1 p-10 border-r border-gfx-green-900/50">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-[3.875rem] h-[3.875rem] rounded-full bg-gfx-green-200 border-2 border-gfx-green-300 flex items-center justify-center">
              <FileTextIcon />
            </div>
            <div>
              <p className="text-white text-lg font-acid font-medium">Identity</p>
              <p className="text-gfx-neutral-400 text-sm font-acid">Government-issued ID</p>
            </div>
          </div>

          <p className="text-white text-lg font-acid font-medium mb-4">Requirements</p>
          <div className="flex flex-col gap-4">
            {REQUIREMENTS.map((req) => (
              <div key={req} className="flex items-start gap-3">
                <FolderCheckIcon />
                <p className="text-gfx-neutral-500 text-sm font-acid leading-relaxed">{req}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gfx-green-900 rounded-[1.25rem] px-6 py-4">
            <p className="text-gfx-neutral-500 text-sm font-acid leading-relaxed">
              Tip: Take the photo in a well-lit area without glare or shadows
            </p>
          </div>
        </div>

        {/* Right side — Upload area */}
        <div className="flex-1 p-10 flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <UploadIcon />
            <div>
              <p className="text-white text-lg font-acid font-medium">Upload Your Document</p>
              <p className="text-gfx-neutral-400 text-sm font-acid">Drag and drop or click to browse</p>
            </div>
          </div>

          <div
            className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors ${
              dragOver ? 'border-gfx-green-300 bg-gfx-green-200/10' : 'border-gfx-neutral-350'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false) }}
          >
            <input ref={fileInputRef} type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
            <button
              type="button"
              className="h-11 px-8 rounded-full bg-gfx-green-lightest text-black text-base font-acid font-medium cursor-pointer hover:bg-gfx-green-lightest-hover transition-colors"
            >
              Choose File
            </button>
            <p className="text-gfx-neutral-400 text-sm font-acid">JPG, PNG or PDF • Max 10MB</p>
          </div>

          <div className="mt-4 flex items-center gap-3 bg-gfx-green-900 rounded-[1.375rem] px-3 py-2.5 w-fit">
            <ClockIcon />
            <p className="text-gfx-neutral-500 text-sm font-acid">Verification typically takes within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function TradingFeaturesTable() {
  return (
    <div className="bg-gfx-green-800 border border-gfx-green-800 rounded-2xl overflow-hidden px-10 pt-8 pb-6">
      <h3 className="text-white text-2xl font-acid leading-normal mb-8">Verification – Trading</h3>

      <div className="flex items-center justify-between pb-4 border-b border-gfx-green-900">
        <span className="text-gfx-green-300 text-base font-acid font-medium">Features</span>
        <span className="text-gfx-green-300 text-base font-acid font-medium">Allowed</span>
      </div>

      {TRADING_FEATURES.map((feature) => (
        <div key={feature} className="flex items-center justify-between py-5 border-b border-gfx-green-900">
          <span className="text-white text-base font-acid font-medium">{feature}</span>
          <CloseSquareIcon />
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
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[75%] w-[30.8125rem] h-[17.375rem] rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <h3 className="text-white text-2xl font-acid leading-normal px-10 pt-10">My Rewards</h3>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mt-4">
            <GiftIcon />
          </div>
          <p className="text-gfx-neutral-400 text-base font-acid font-medium mt-6">No promotions found</p>
          <p className="text-gfx-neutral-400 text-base font-acid font-medium mt-3">Use a promo code when signing up to get exclusive bonuses!</p>
        </div>
      </div>
    </GlassCard>
  )
}

function ChatDialogIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V14C22 16.2091 20.2091 18 18 18H13.4142L9.70711 21.7071C9.07714 22.3371 8 21.8909 8 21V18H6C3.79086 18 2 16.2091 2 14V6ZM7 8.5C7 8.22386 7.22386 8 7.5 8H16.5C16.7761 8 17 8.22386 17 8.5C17 8.77614 16.7761 9 16.5 9H7.5C7.22386 9 7 8.77614 7 8.5ZM7 12.5C7 12.2239 7.22386 12 7.5 12H12.5C12.7761 12 13 12.2239 13 12.5C13 12.7761 12.7761 13 12.5 13H7.5C7.22386 13 7 12.7761 7 12.5Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

function EnvelopeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V19C21 19.5523 20.5523 20 20 20H4C3.44772 20 3 19.5523 3 19V5ZM5.5 7.5L12 12.5L18.5 7.5L17.5 6.5L12 10.5L6.5 6.5L5.5 7.5Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" fill="#25D366" />
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" fill="#25D366" />
    </svg>
  )
}

function HelpCenterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm-.004 4c-1.657 0-3 1.343-3 3h2c0-.552.448-1 1-1s1 .448 1 1c0 .374-.187.724-.5.928l-.625.375A2.498 2.498 0 0 0 10.996 12.5V13h2v-.5c0-.374.187-.724.5-.928l.625-.375a2.998 2.998 0 0 0 .875-4.197c-.625-.883-1.66-1.5-2.996-1.5h-.004ZM11 15v2h2v-2h-2Z" fill="var(--color-gfx-green-300)" />
    </svg>
  )
}

interface SupportCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  actionLabel?: string
}

function SupportCard({ icon, title, subtitle, actionLabel }: SupportCardProps) {
  return (
    <div className="bg-gfx-green-800 border border-gfx-green-800 rounded-[1.875rem] p-5 h-[7.8125rem] relative shadow-[0_0.29rem_0.725rem_0_rgba(0,0,0,0.03)]">
      <div className="flex items-start gap-5">
        <div className="w-[3.375rem] h-[3.375rem] rounded-[0.625rem] bg-[#021b13] flex items-center justify-center shrink-0">
          {icon}
        </div>
        <div className="pt-1">
          <h4 className="text-white text-2xl font-acid leading-normal">{title}</h4>
          <p className="text-gfx-neutral-400 text-base font-acid mt-2">{subtitle}</p>
          {actionLabel && (
            <p className="text-gfx-green-500 text-base font-acid mt-2">{actionLabel}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function SupportTab() {
  return (
    <GlassCard className="mt-10 !rounded-[1.16rem] mx-auto">
      <div className="relative overflow-hidden px-10 pt-10 pb-10">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%] w-[30.8125rem] h-[17.375rem] rounded-full pointer-events-none opacity-60"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <h3 className="text-white text-2xl font-acid leading-normal mb-8">Contact support</h3>
        <div className="grid grid-cols-2 gap-5">
          <SupportCard
            icon={<ChatDialogIcon />}
            title="Live chat"
            subtitle="Available 24/7"
            actionLabel="Start  Live Chat"
          />
          <SupportCard
            icon={<EnvelopeIcon />}
            title="Email Support"
            subtitle="support@genesisfxmarkets.com"
          />
          <SupportCard
            icon={<WhatsappIcon />}
            title="Whatsapp"
            subtitle="Quick chat support"
          />
          <SupportCard
            icon={<HelpCenterIcon />}
            title="Help Center"
            subtitle="Browse common questions"
          />
        </div>
      </div>
    </GlassCard>
  )
}

function ProfileTab() {
  return (
    <>
      <GlassCard className="mt-10 !rounded-lg">
        <div className="px-20 pt-4 pb-10">
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
      </GlassCard>

      <GlassCard className="mt-8 !rounded-lg">
        <div className="px-20 pt-4 pb-10">
          <h3 className="text-white text-2xl font-acid leading-normal mb-8">KYC Status</h3>
          <div className="grid grid-cols-2 gap-x-8">
            <KycStatusItem title="Identify Document" subtitle="Not Submitted" />
            <KycStatusItem title="Proof of Address" subtitle="Not Submitted" />
          </div>
        </div>
      </GlassCard>
    </>
  )
}

function VerificationTab() {
  return (
    <>
      <GlassCard className="mt-10 !rounded-lg">
        <div className="px-10 pt-8 pb-0">
          <h3 className="text-white text-2xl font-acid leading-normal mb-10">KYC Verification Status</h3>
          <VerificationStepper activeStep={0} />
        </div>
        <div className="px-10 pb-10 pt-8">
          <IdentityDetailCard />
        </div>
      </GlassCard>

      <GlassCard className="mt-8 !rounded-lg !p-0">
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
      <div className="relative bg-gfx-green-800 border border-gfx-green-300/12 rounded-lg overflow-hidden">
        {/* Banner area */}
        <div
          className="relative h-48 border-b border-white/5"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 1545 190' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%25' width='100%25' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(125.85 0 0 121.03 309 228)'><stop stop-color='rgba(16,185,129,0.35)' offset='0'/><stop stop-color='rgba(16,185,129,0)' offset='0.6'/></radialGradient></defs></svg>"), linear-gradient(160.71deg, #0A1F18 0%, #071410 70%)`,
          }}
        >
          {/* Pixel texture */}
          <div
            className="absolute right-0 top-0 w-[31.25rem] h-full opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'url(/images/pixels.png)',
              backgroundSize: '41.5rem',
              backgroundPosition: '-10.875rem 0.7rem',
              maskImage: 'linear-gradient(to left, black 60%, transparent)',
              WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent)',
            }}
            aria-hidden="true"
          />

          {/* Avatar */}
          <div className="absolute left-10 -bottom-12">
            <div className="relative w-28 h-28 rounded-full bg-gfx-green-800 border-4 border-gfx-sidebar flex items-center justify-center overflow-hidden">
              <span className="text-white text-3xl font-acid font-bold relative z-10">JD</span>
              {/* Avatar glow */}
              <div className="absolute -bottom-18 left-1/2 -translate-x-1/2 w-[17.1875rem] h-[7.27rem] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.4) 0%, transparent 70%)' }} aria-hidden="true" />
            </div>
            {/* Camera button */}
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gfx-green-300 border-[3px] border-gfx-green-800 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 4.375V9.625M4.375 7H9.625" stroke="#0C1311" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5.25 1.75H8.75L9.625 3.5H11.375C11.856 3.5 12.25 3.894 12.25 4.375V10.5C12.25 10.981 11.856 11.375 11.375 11.375H2.625C2.144 11.375 1.75 10.981 1.75 10.5V4.375C1.75 3.894 2.144 3.5 2.625 3.5H4.375L5.25 1.75Z" stroke="#0C1311" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Profile info */}
        <div className="pl-44 pt-2.5 pb-6">
          <h2 className="text-white text-2xl font-acid leading-normal">Joe Doe</h2>
          <p className="text-gfx-neutral-400 text-sm font-acid leading-tight mt-3">joedoe@gmail.com</p>
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
      </div>
    </div>
  )
}
