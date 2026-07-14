import { useState } from 'react'
import { GlassCard, GlassInput } from '@/components/ui'

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
    <div className="w-[0.375rem] h-[0.375rem] rounded-[0.1875rem] bg-gfx-green-300" />
  )
}

function PammIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M4.0625 9.75V6.5M6.5 9.75V3.25M8.9375 9.75V5.6875" stroke="#C8AFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
    purple: 'bg-[#090414] border-[#2D1F4B] text-[#C8AFFF]',
  }

  return (
    <div className={`inline-flex items-center gap-[0.4375rem] h-[1.9375rem] px-[0.875rem] rounded-[1.25rem] border ${styles[variant]}`}>
      {icon}
      <span className="text-[0.875rem] font-acid leading-[1.175rem] whitespace-nowrap">{label}</span>
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
      <div className="flex items-start gap-[0.625rem] px-[1.5625rem] pt-[1.3125rem]">
        <WarningTriangleIcon />
        <div>
          <p className="text-white text-[1rem] font-acid font-medium leading-[1.528rem]">{title}</p>
          <p className="text-gfx-neutral-400 text-[0.875rem] font-acid leading-[1.175rem]">{subtitle}</p>
        </div>
      </div>
    </GlassCard>
  )
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Profile')

  return (
    <div className="w-full max-w-[74.375rem] mx-auto font-acid">
      {/* Profile Header Card */}
      <div className="relative bg-[#0d1512] border border-[rgba(16,185,129,0.12)] rounded-[1.125rem] overflow-hidden">
        {/* Banner area */}
        <div
          className="relative h-[11.875rem] border-b border-[rgba(255,255,255,0.05)]"
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
          <div className="absolute left-[2.5rem] bottom-[-2.875rem]">
            <div className="relative w-[7.25rem] h-[7.25rem] rounded-full bg-gfx-green-800 border-4 border-[#060a09] flex items-center justify-center overflow-hidden">
              <span className="text-[#f5f7f6] text-[1.975rem] font-['Segoe_UI'] font-bold relative z-10">JD</span>
              {/* Avatar glow */}
              <div className="absolute bottom-[-4.5rem] left-1/2 -translate-x-1/2 w-[17.1875rem] h-[7.27rem] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.4) 0%, transparent 70%)' }} aria-hidden="true" />
            </div>
            {/* Camera button */}
            <div className="absolute bottom-0 right-0 w-[2rem] h-[2rem] rounded-[1rem] bg-[#40c99c] border-[3px] border-gfx-green-800 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 4.375V9.625M4.375 7H9.625" stroke="#0C1311" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5.25 1.75H8.75L9.625 3.5H11.375C11.856 3.5 12.25 3.894 12.25 4.375V10.5C12.25 10.981 11.856 11.375 11.375 11.375H2.625C2.144 11.375 1.75 10.981 1.75 10.5V4.375C1.75 3.894 2.144 3.5 2.625 3.5H4.375L5.25 1.75Z" stroke="#0C1311" strokeWidth="1.2" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Profile info */}
        <div className="pl-[11rem] pt-[0.625rem] pb-[1.5rem]">
          <h2 className="text-[#f5f7f6] text-[1.5rem] font-acid leading-normal">Joe Doe</h2>
          <p className="text-gfx-neutral-400 text-[0.875rem] font-acid leading-[1.175rem] mt-[0.75rem]">joedoe@gmail.com</p>
          <div className="flex flex-wrap items-center gap-[0.5rem] mt-[0.75rem]">
            <ProfileBadge icon={<IdIcon />} label="ID: f00e4a5d" />
            <ProfileBadge icon={<KycIcon />} label="KYC Required" />
            <ProfileBadge icon={<PartnerDotIcon />} label="Partner" variant="green" />
            <ProfileBadge icon={<PammIcon />} label="PAMM Manager" variant="purple" />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mt-[2.5rem] bg-[#111312] rounded-full h-[2.875rem] flex items-center px-[0.125rem]">
        {TABS.map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`h-[2.625rem] px-[1.5rem] rounded-full text-[1rem] font-acid font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? 'bg-[#064B34] border border-gfx-green-300 text-white'
                : 'text-gfx-neutral-500 hover:text-white border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Personal Information */}
      <GlassCard className="mt-[2.5rem] !rounded-[1.125rem]">
        <div className="px-[5rem] pt-[1rem] pb-[2.5rem]">
          <h3 className="text-white text-[1.5rem] font-acid leading-normal mb-[2.5rem]">Personal Information</h3>
          <div className="grid grid-cols-2 gap-x-[2rem] gap-y-[1.5rem]">
            <GlassInput label="First Name" placeholder="Joe" />
            <GlassInput label="First Name" placeholder="Cedeno" />
            <GlassInput label="Email Address" placeholder="joedoe@gmail.com" />
            <GlassInput label="Phone Number" placeholder="88565242" />
            <GlassInput label="Address" placeholder="3400 Ocee Street APT 1103" />
            <GlassInput label="Country" placeholder="United states" />
          </div>
        </div>
      </GlassCard>

      {/* KYC Status */}
      <GlassCard className="mt-[2rem] !rounded-[1.125rem]">
        <div className="px-[5rem] pt-[1rem] pb-[2.5rem]">
          <h3 className="text-white text-[1.5rem] font-acid leading-normal mb-[2rem]">KYC Status</h3>
          <div className="grid grid-cols-2 gap-x-[2rem]">
            <KycStatusItem title="Identify Document" subtitle="Not Submitted" />
            <KycStatusItem title="Proof of Address" subtitle="Not Submitted" />
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
