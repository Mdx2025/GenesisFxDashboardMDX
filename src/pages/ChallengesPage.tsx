import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import { useSidebar } from '@/layouts/RootLayout'
import { TopBar } from '@/components/dashboard/TopBar'
import { GlassCard, GlassBannerCard, SearchInput, GlowButton, SparkleButton, ModeToggle, Badge, GlassSelect, GlassInput } from '@/components/ui'

function TrophyIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M28.5 10.5V10.6c0 1.1 0 1.65-.27 2.1-.27.3-.73.57-1.7 1.1l-1-.01c.7-2.37.93-4.91 1.01-7.1l.01-.28c.83.29 1.3.5 1.6.9.35.5.35 1.17.35 2.5z" fill="white"/>
      <path d="M3.5 10.5V10.6c0 1.1 0 1.65.27 2.1.27.3.73.57 1.7 1.1l1-.01c-.7-2.37-.93-4.91-1.01-7.1l-.01-.28c-.83.29-1.3.5-1.6.9-.35.5-.35 1.17-.35 2.5z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.5 3.2c-1.44-.24-3.32-.44-5.6-.44-2.28 0-4.17.2-5.6.44-1.46.25-2.19.37-2.8 1.12-.6.75-.57 1.56-.51 3.18.22 5.56 1.42 12.5 7.95 13.11v4.52h-1.83c-.6 0-1.13.43-1.25 1.02l-.24 1.21h-3.39c-.53 0-.96.43-.96.96s.43.96.96.96h15.36c.53 0 .96-.43.96-.96s-.43-.96-.96-.96h-3.39l-.24-1.21c-.12-.6-.65-1.02-1.25-1.02h-1.83v-4.52c6.53-.61 7.73-7.55 7.95-13.11.06-1.62.1-2.43-.51-3.18-.61-.75-1.34-.87-2.8-1.12z" fill="white"/>
    </svg>
  )
}

function UserRoundedIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <ellipse cx="16" cy="10" rx="5.5" ry="5.5" fill="#00B38C"/>
      <ellipse cx="16" cy="25" rx="9.5" ry="5.5" fill="#00B38C"/>
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M16.1667 2H4.5C3.32149 2 2.73223 2 2.36612 2.3435C2 2.687 2 3.23985 2 4.34555V4.9204C2 5.78527 2 6.2177 2.21633 6.57618C2.43267 6.93466 2.82789 7.15715 3.61835 7.60212L6.04587 8.96865C6.57622 9.2672 6.84139 9.41648 7.03126 9.58131C7.42665 9.92458 7.67007 10.3279 7.78037 10.8226C7.83333 11.0602 7.83333 11.3382 7.83333 11.8941V14.1187C7.83333 14.8766 7.83333 15.2556 8.04327 15.5511C8.25321 15.8465 8.62607 15.9923 9.3718 16.2838C10.9373 16.8958 11.7201 17.2018 12.2767 16.8537C12.8333 16.5055 12.8333 15.7099 12.8333 14.1187V11.8941C12.8333 11.3382 12.8333 11.0602 12.8863 10.8226C12.9966 10.3279 13.24 9.92458 13.6354 9.58131C13.8253 9.41648 14.0904 9.2672 14.6208 8.96865L17.0483 7.60212C17.8388 7.15715 18.234 6.93466 18.4503 6.57618C18.6667 6.2177 18.6667 5.78527 18.6667 4.9204V4.34555C18.6667 3.23985 18.6667 2.687 18.3005 2.3435C17.9344 2 17.3452 2 16.1667 2Z" fill="#808080"/>
    </svg>
  )
}

function PrizePoolTrophyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M16.5 6.12176L16.5 6.17615C16.4999 6.82171 16.4999 7.14449 16.3445 7.40857C16.1891 7.67266 15.907 7.82942 15.3427 8.14293L14.7477 8.47349C15.1577 7.08738 15.2945 5.59811 15.345 4.32448C15.3472 4.26987 15.3497 4.21459 15.3521 4.15872L15.3538 4.11959C15.8423 4.28922 16.1165 4.41568 16.2876 4.65306C16.5 4.94769 16.5 5.33905 16.5 6.12176Z" fill="#C6C6C6"/>
      <path d="M1.5 6.12176L1.5 6.17615C1.50002 6.82171 1.50003 7.14449 1.65542 7.40857C1.81081 7.67266 2.09297 7.82942 2.65729 8.14293L3.2526 8.47367C2.84255 7.08751 2.70575 5.59816 2.65519 4.32448C2.65302 4.26987 2.65058 4.21459 2.64811 4.15872L2.64638 4.1195C2.15775 4.28917 1.88344 4.41564 1.71232 4.65306C1.49997 4.94769 1.49998 5.33905 1.5 6.12176Z" fill="#C6C6C6"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.2828 1.76006C11.4398 1.61782 10.3378 1.5 9.00012 1.5C7.66246 1.5 6.56043 1.61782 5.71738 1.76006C4.86334 1.90415 4.43631 1.9762 4.07952 2.41562C3.72274 2.85505 3.74159 3.32998 3.7793 4.27985C3.90877 7.54078 4.61247 11.6138 8.4375 11.9742V14.625H7.36485C7.00734 14.625 6.69953 14.8773 6.62942 15.2279L6.4875 15.9375H4.5C4.18934 15.9375 3.9375 16.1893 3.9375 16.5C3.9375 16.8107 4.18934 17.0625 4.5 17.0625H13.5C13.8107 17.0625 14.0625 16.8107 14.0625 16.5C14.0625 16.1893 13.8107 15.9375 13.5 15.9375H11.5125L11.3706 15.2279C11.3005 14.8773 10.9927 14.625 10.6351 14.625H9.5625V11.9743C13.3877 11.614 14.0915 7.54084 14.2209 4.27985C14.2586 3.32998 14.2775 2.85505 13.9207 2.41562C13.5639 1.9762 13.1369 1.90415 12.2828 1.76006Z" fill="#C6C6C6"/>
    </svg>
  )
}

function NewAccountUserIconDark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="4.5" r="3" fill="black"/>
      <ellipse cx="9" cy="12.75" rx="5.25" ry="3" fill="black"/>
    </svg>
  )
}

function TrophySmallIcon({ variant }: { variant: 'gold' | 'silver' | 'bronze' | 'none' }) {
  if (variant === 'none') return null
  const colors: Record<string, string> = { gold: '#FFD700', silver: '#C0C0C0', bronze: '#CD7F32' }
  return (
    <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
      <path d="M28.5 10.5V10.6c0 1.1 0 1.65-.27 2.1-.27.3-.73.57-1.7 1.1l-1-.01c.7-2.37.93-4.91 1.01-7.1l.01-.28c.83.29 1.3.5 1.6.9.35.5.35 1.17.35 2.5z" fill={colors[variant]}/>
      <path d="M3.5 10.5V10.6c0 1.1 0 1.65.27 2.1.27.3.73.57 1.7 1.1l1-.01c-.7-2.37-.93-4.91-1.01-7.1l-.01-.28c-.83.29-1.3.5-1.6.9-.35.5-.35 1.17-.35 2.5z" fill={colors[variant]}/>
      <path fillRule="evenodd" clipRule="evenodd" d="M21.5 3.2c-1.44-.24-3.32-.44-5.6-.44-2.28 0-4.17.2-5.6.44-1.46.25-2.19.37-2.8 1.12-.6.75-.57 1.56-.51 3.18.22 5.56 1.42 12.5 7.95 13.11v4.52h-1.83c-.6 0-1.13.43-1.25 1.02l-.24 1.21h-3.39c-.53 0-.96.43-.96.96s.43.96.96.96h15.36c.53 0 .96-.43.96-.96s-.43-.96-.96-.96h-3.39l-.24-1.21c-.12-.6-.65-1.02-1.25-1.02h-1.83v-4.52c6.53-.61 7.73-7.55 7.95-13.11.06-1.62.1-2.43-.51-3.18-.61-.75-1.34-.87-2.8-1.12z" fill={colors[variant]}/>
    </svg>
  )
}

function UserAvatarIcon() {
  return (
    <div className="w-[2rem] h-[2rem] rounded-full bg-[#064B34] flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="4.5" r="3" fill="#00B38C"/>
        <ellipse cx="9" cy="12.75" rx="5.25" ry="3" fill="#00B38C"/>
      </svg>
    </div>
  )
}

function Sparkline() {
  return (
    <svg width="80" height="32" viewBox="0 0 80 32" fill="none">
      <path d="M2 28 L12 22 L22 24 L32 18 L42 16 L52 12 L62 8 L72 4 L78 2" stroke="#10BC83" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10BC83" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#10BC83" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d="M2 28 L12 22 L22 24 L32 18 L42 16 L52 12 L62 8 L72 4 L78 2 V32 H2 Z" fill="url(#sparkGrad)"/>
    </svg>
  )
}

const leaderboardData = [
  { rank: 1, user: 'GAB1', tier: 'Tier 3', returnPct: '+112.45%', reward: '$500.00', trophy: 'gold' as const },
  { rank: 2, user: 'GAB1', tier: 'Tier 2', returnPct: '+112.45%', reward: '$250.00', trophy: 'silver' as const },
  { rank: 3, user: 'GAB1', tier: 'Tier 3', returnPct: '+112.45%', reward: '$100.00', trophy: 'bronze' as const },
  { rank: 4, user: 'GAB1', tier: 'Tier 1', returnPct: '+112.45%', reward: '$50.00', trophy: 'none' as const },
  { rank: 5, user: 'GAB1', tier: 'Tier 3', returnPct: '+112.45%', reward: '$50.00', trophy: 'none' as const },
  { rank: 6, user: 'GAB1', tier: 'Tier 3', returnPct: '+112.45%', reward: '$50.00', trophy: 'none' as const },
  { rank: 7, user: 'GAB1', tier: 'Tier 3', returnPct: '+112.45%', reward: '$50.00', trophy: 'none' as const },
]

function LeaderboardContent() {
  return (
    <GlassCard variant="light" divider="white" rounded="26px" className="overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[400px] h-[160px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[1.1875rem] font-bold tracking-tight text-white">Monthly Tier Leaderboard</h2>
          <Badge variant="status">April 2026</Badge>
        </div>
      </div>
      <div className="overflow-x-auto" role="region" aria-label="Leaderboard table, scrollable">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-y border-white/5">
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase px-4 sm:px-6 py-4 w-[10%]">Rank</th>
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[18%]">User</th>
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[18%]">Current Tier</th>
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[18%]">Return %</th>
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[20%]">Chart</th>
              <th className="text-right text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase pr-4 sm:pr-6 py-4 w-[16%]">Reward</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((row, i) => (
              <tr key={row.rank} className={i > 0 ? 'border-t border-white/5' : ''}>
                <td className="px-4 sm:px-6 py-4 xl:py-5">
                  <div className="flex items-center gap-2">
                    <TrophySmallIcon variant={row.trophy} />
                    <span className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem]">{row.rank}</span>
                  </div>
                </td>
                <td className="py-4 xl:py-5">
                  <div className="flex items-center gap-3">
                    <UserAvatarIcon />
                    <span className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem]">{row.user}</span>
                  </div>
                </td>
                <td className="text-[#a0a0a0] text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] py-4 xl:py-5">{row.tier}</td>
                <td className="text-[#10BC83] text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] font-semibold py-4 xl:py-5">{row.returnPct}</td>
                <td className="py-4 xl:py-5"><Sparkline /></td>
                <td className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] font-semibold text-right pr-4 sm:pr-6 py-4 xl:py-5">{row.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-6" />
    </GlassCard>
  )
}

function ChevronRightTinyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M5 3l4 4-4 4" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const tiersData = [
  { tier: 'Tier 1', deposit: '$125', equity: '$1,250', maxDrawdown: '10%', status: 'Active' as const },
  { tier: 'Tier 1', deposit: '$125', equity: '$1,250', maxDrawdown: '10%', status: 'Active' as const },
  { tier: 'Tier 1', deposit: '$125', equity: '$1,250', maxDrawdown: '10%', status: 'Active' as const },
  { tier: 'Tier 1', deposit: '$125', equity: '$1,250', maxDrawdown: '10%', status: 'Active' as const },
  { tier: 'Tier 1', deposit: '$125', equity: '$1,250', maxDrawdown: '10%', status: 'Coming Soon' as const },
]

function TiersContent({ onPurchase }: { onPurchase?: () => void }) {
  return (
    <GlassCard variant="light" divider="white" rounded="26px" className="overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 -top-[15%] w-[400px] h-[160px] rounded-full pointer-events-none bg-gfx-glow-green [filter:url(#blur-120)] will-change-transform" aria-hidden="true" />
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3">
          <h2 className="text-[1.1875rem] font-bold tracking-tight text-white">10X Challenge Tiers</h2>
          <Badge variant="status">April 2026</Badge>
        </div>
      </div>
      <div className="overflow-x-auto" role="region" aria-label="Tiers table, scrollable">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-y border-white/5">
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase px-4 sm:px-6 py-4 w-[12%]">Tier</th>
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[14%]">Deposit</th>
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[16%]">10x Equity</th>
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[18%]">Max Drawdown</th>
              <th className="text-left text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase py-4 w-[16%]">Status</th>
              <th className="text-right text-[0.7rem] font-bold tracking-[0.22em] text-gfx-neutral-300 uppercase pr-4 sm:pr-6 py-4 w-[24%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {tiersData.map((row, i) => (
              <tr key={i} className={i > 0 ? 'border-t border-white/5' : ''}>
                <td className="px-4 sm:px-6 py-4 xl:py-5">
                  <span className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem]">{row.tier}</span>
                </td>
                <td className="py-4 xl:py-5">
                  <div className="flex items-center gap-1">
                    <span className="text-white text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem]">{row.deposit}</span>
                    <ChevronRightTinyIcon />
                  </div>
                </td>
                <td className="text-[#10BC83] text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] font-semibold py-4 xl:py-5">{row.equity}</td>
                <td className="text-[#a0a0a0] text-[0.875rem] 3xl:text-[1.125rem] 4xl:text-[1.5rem] py-4 xl:py-5">{row.maxDrawdown}</td>
                <td className="py-4 xl:py-5">
                  {row.status === 'Active' ? (
                    <span className="inline-flex items-center text-[0.6875rem] font-normal capitalize tracking-wider rounded-full px-3 py-1 bg-gfx-green-100 border border-gfx-green-200 text-gfx-green-500">
                      Active
                    </span>
                  ) : (
                    <span className="text-[#808080] text-[0.875rem] italic">Coming Soon</span>
                  )}
                </td>
                <td className="text-right pr-4 sm:pr-6 py-4 xl:py-5">
                  <div className="flex justify-end">
                    <GlowButton label="Purchase" width={135} height={44} fontSize={14} onClick={onPurchase} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="h-6" />
    </GlassCard>
  )
}

function MyChallengesContent({ onCreateAccount }: { onCreateAccount?: () => void }) {
  return (
    <>
      {/* Hero Banner */}
      <GlassBannerCard contentClassName="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 xl:p-8 gap-6 lg:min-h-[17.4375rem]">
        <div className="flex flex-col">
          <h2 className="text-white text-[clamp(1.5rem,1rem+1.5vw,3.125rem)] font-normal">10x Challenge</h2>
          <p className="text-[#808080] text-body2">
            Turn $125 into $1,000,000 — prove your skill, level up your capital
          </p>
        </div>
        <div className="flex items-center gap-4 bg-[#09241C] rounded-[1.875rem] px-6 py-4 shrink-0">
          <div className="w-[6.125rem] h-[6.125rem] rounded-xl bg-[#064B34] flex items-center justify-center">
            <TrophyIcon />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-white text-[clamp(1.5rem,1rem+1.5vw,3.125rem)] font-normal">0</span>
            <span className="text-[#808080] text-[1rem] font-medium">My challenges</span>
          </div>
        </div>
      </GlassBannerCard>

      {/* Empty State */}
      <GlassCard variant="light" divider="white" rounded="19px" className="overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4 gap-6">
          <div className="w-[4.375rem] h-[4.375rem] rounded-full bg-[#09241C] flex items-center justify-center">
            <UserRoundedIcon />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-white text-[1.5rem] font-normal">No 10x Accounts Yet</h3>
            <p className="text-[#808080] text-body2 text-center max-w-lg">
              Create your first 10X account to start trading with enhanced leverage
            </p>
          </div>
          <GlowButton label="Create account" width={210} height={44} fontSize={16} onClick={onCreateAccount} />
        </div>
      </GlassCard>
    </>
  )
}

const leaderboardPrizes = [
  { rank: '#1', prize: '$500' },
  { rank: '#2', prize: '$250' },
  { rank: '#3', prize: '$150' },
  { rank: '#4-18', prize: '$100' },
  { rank: '#11-25', prize: '$50' },
]

function QuestionIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6.8175 6.75C6.99383 6.24875 7.34186 5.82608 7.79997 5.55685C8.25808 5.28762 8.79667 5.18891 9.31873 5.27809C9.84079 5.36727 10.3125 5.63849 10.6518 6.04254C10.9911 6.44659 11.1761 6.95765 11.175 7.485C11.175 9 8.925 9.75 8.925 9.75" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12.75H9.0075" stroke="#808080" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PrizePoolModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) { onClose(); return }
    gsap.to(modal, { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlay, {
      opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => { setMounted(false); onClose() },
    })
  }, [onClose])

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) return
    gsap.set(overlay, { opacity: 0 })
    gsap.set(modal, { opacity: 0, scale: 0.96 })
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modal, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, handleClose])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Prize Pool"
    >
      <div ref={modalRef} className="relative w-[793px] max-w-[95vw]">
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-[30px] bg-[#0C1311] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)] outline outline-[1.16px] outline-offset-[-1.16px] outline-[#0C1311]"
          aria-hidden="true"
        >
          <div className="absolute w-[493px] h-[278px] -left-[198px] bottom-[136px] bg-[#064B34] rounded-full blur-[157px]" />
          <div className="absolute w-[493px] h-[278px] right-[-335px] -top-[18px] bg-[#064B34] rounded-full blur-[157px]" />
          <div className="absolute w-[587px] h-[435px] left-[350px] -top-[133px] rotate-[48deg] origin-top-left bg-[#0C1311] rounded-full blur-[157px]" />
        </div>

        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[26px] top-[31px] w-[24px] h-[24px]"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="relative z-10 px-15 py-20">
          {/* Header: Title + April 2026 badge + How it works */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-white font-acid font-normal text-[1.75rem] leading-none">
                Current Month Prize Pool
              </h2>
              <span className="px-3 py-1 rounded-full bg-[#09241C] border border-[#064B34] text-[#a0a0a0] text-xs">
                April 2026
              </span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#303030] bg-transparent text-[#a0a0a0] text-sm font-acid cursor-pointer hover:bg-white/5 transition-colors"
            >
              <QuestionIcon />
              <span>How it works</span>
            </button>
          </div>

          {/* Tier Leaderboard header + Top Prize */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-acid font-normal text-[1.25rem]">Tier Leaderboard</h3>
            <div className="flex flex-col items-center px-5 py-2.5 rounded-[0.875rem] border border-[#10BC83]/30">
              <span className="text-[#10BC83] text-[1.5rem] font-acid font-medium leading-tight">$500</span>
              <span className="text-[#10BC83] text-xs font-acid">Top Prize</span>
            </div>
          </div>

          {/* Rank / Prize table */}
          <div className="w-full">
            <div className="flex items-center pb-3 mb-1">
              <div className="w-[30%] text-[#606060] text-xs font-medium tracking-[0.08em]">Rank</div>
              <div className="w-[70%] text-[#606060] text-xs font-medium tracking-[0.08em] text-right">Prize</div>
            </div>
            {leaderboardPrizes.map((row, i) => (
              <div key={i} className="flex items-center py-4 border-b border-white/[0.04] last:border-b-0">
                <div className="w-[30%]">
                  <span className="text-[#a0a0a0] text-sm font-acid">{row.rank}</span>
                </div>
                <div className="w-[70%] text-right">
                  <span className="text-white text-base font-acid font-medium">{row.prize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function RulesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M6 1.5H4.5C3.67157 1.5 3 2.17157 3 3V15C3 15.8284 3.67157 16.5 4.5 16.5H13.5C14.3284 16.5 15 15.8284 15 15V3C15 2.17157 14.3284 1.5 13.5 1.5H12" stroke="#808080" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M6 1.5C6 2.32843 6.67157 3 7.5 3H10.5C11.3284 3 12 2.32843 12 1.5C12 0.671573 11.3284 0 10.5 0H7.5C6.67157 0 6 0.671573 6 1.5Z" stroke="#808080" strokeWidth="1.2"/>
      <path d="M6 7.5H12M6 10.5H12M6 13.5H9" stroke="#808080" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (!checked) {
    return (
      <div className="w-[1.125rem] h-[1.125rem] rounded-[0.25rem] border border-[#303030] shrink-0" />
    )
  }
  return (
    <div className="w-[1.125rem] h-[1.125rem] rounded-[0.25rem] bg-[#10BC83] flex items-center justify-center shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

const accountPreviewRows = [
  { label: 'Account Name', value: 'Your Account Name' },
  { label: 'Account Mode', value: 'Live', valueColor: '#10BC83', dot: true },
  { label: 'Deposit', value: '$125' },
  { label: '10x Leverage', value: '$1,250' },
  { label: 'Account Type', value: '10x Account' },
  { label: 'Max Leverage', value: '1:500' },
  { label: 'Platform', value: 'TradeLocker' },
  { label: 'Server', value: 'GenFX' },
]

function StartChallengeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [username, setUsername] = useState('')

  const handleClose = useCallback(() => {
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) { onClose(); return }
    gsap.to(modal, { opacity: 0, scale: 0.96, duration: 0.2, ease: 'power2.in' })
    gsap.to(overlay, {
      opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => { setMounted(false); onClose() },
    })
  }, [onClose])

  useEffect(() => {
    if (open) setMounted(true)
  }, [open])

  useLayoutEffect(() => {
    if (!mounted) return
    const overlay = overlayRef.current
    const modal = modalRef.current
    if (!overlay || !modal) return
    gsap.set(overlay, { opacity: 0 })
    gsap.set(modal, { opacity: 0, scale: 0.96 })
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.to(modal, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', delay: 0.05 })
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    function handleKey(e: KeyboardEvent) { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mounted, handleClose])

  if (!mounted) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gfx-overlay backdrop-blur-[4px]"
      onClick={(e) => { if (e.target === overlayRef.current) handleClose() }}
      role="dialog"
      aria-modal="true"
      aria-label="Start your 10x Challenge"
    >
      <div ref={modalRef} className="relative w-[680px] max-w-[95vw]">
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none rounded-[1.25rem] bg-[#0C1311] shadow-[0px_4.64px_23.2px_rgba(0,0,0,0.03)] outline outline-[1.16px] outline-offset-[-1.16px] outline-[#0C1311]"
          aria-hidden="true"
        >
          <div className="absolute w-[400px] h-[220px] -left-[150px] bottom-[80px] bg-[#064B34] rounded-full blur-[140px]" />
          <div className="absolute w-[400px] h-[220px] right-[-250px] -top-[18px] bg-[#064B34] rounded-full blur-[140px]" />
          <div className="absolute w-[450px] h-[350px] left-[300px] -top-[100px] rotate-[48deg] origin-top-left bg-[#0C1311] rounded-full blur-[140px]" />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute z-20 cursor-pointer hover:opacity-70 transition-opacity right-[1.25rem] top-[1.25rem] w-[1.5rem] h-[1.5rem]"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="relative z-10 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white font-acid font-normal text-[1.5rem] leading-none">
              Start your 10x Challenge
            </h2>
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#303030] bg-transparent text-[#a0a0a0] text-sm font-acid cursor-pointer hover:bg-white/5 transition-colors"
            >
              <RulesIcon />
              <span>Rules</span>
            </button>
          </div>

          {/* Two columns */}
          <div className="flex gap-6">
            {/* Left — Challenge Details */}
            <div className="flex-1 bg-[#0A0E0C] rounded-[1rem] p-6 border border-white/[0.04]">
              <h3 className="text-white font-acid font-medium text-[1.125rem] mb-6">Challenge Details</h3>

              <div className="flex flex-col gap-5">
                <GlassSelect
                  label="Starting Equity"
                  placeholder="Enter your preferred account name"
                  options={[
                    { value: '125', label: '$125' },
                    { value: '250', label: '$250' },
                    { value: '500', label: '$500' },
                    { value: '1000', label: '$1,000' },
                  ]}
                />

                <div>
                  <div className="flex items-baseline gap-2 mb-[0.125rem]">
                    <span className="text-white font-acid font-medium text-[1rem]">Username</span>
                    <span className="text-[#808080] font-acid text-[0.8125rem]">(On Leaderboard)</span>
                  </div>
                  <GlassInput
                    placeholder="Enter your preferred account name"
                    value={username}
                    onChange={setUsername}
                  />
                  <span className="text-[#808080] text-[0.75rem] font-acid mt-1.5 block">
                    0/25 characters
                  </span>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => setAgreed(v => !v)}>
                  <CheckboxIcon checked={agreed} />
                  <span className="text-[#808080] text-[0.8125rem] font-acid">
                    I agree to the <span className="text-[#10BC83] underline">Terms & Conditions</span>
                  </span>
                </label>

                <GlowButton label="Create Account" height={48} fontSize={15} />
              </div>
            </div>

            {/* Right — Account Preview */}
            <div className="flex-1 bg-[#0A0E0C] rounded-[1rem] p-6 border border-white/[0.04]">
              <h3 className="text-white font-acid font-medium text-[1.125rem] mb-2">Account Preview</h3>
              <p className="text-[#808080] font-acid text-[0.8125rem] mb-5">Trading Account Details</p>

              <div className="flex flex-col">
                {accountPreviewRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-b-0">
                    <span className="text-[#808080] font-acid text-[0.8125rem]">{row.label}</span>
                    <span className="flex items-center gap-1.5">
                      {row.dot && <span className="w-2 h-2 rounded-full bg-[#10BC83]" />}
                      <span className={`font-acid text-[0.875rem] font-medium ${row.valueColor ? '' : 'text-white'}`} style={row.valueColor ? { color: row.valueColor } : undefined}>
                        {row.value}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChallengesPage() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()
  const [activeTab, setActiveTab] = useState(0)
  const [prizePoolOpen, setPrizePoolOpen] = useState(false)
  const [startChallengeOpen, setStartChallengeOpen] = useState(false)

  return (
    <div className="relative px-4 xl:px-5 2xl:px-7 3xl:px-10 4xl:px-14 py-4 4xl:py-6">
      <TopBar
        onMenuClick={() => setSidebarOpen(prev => !prev)}
        menuOpen={sidebarOpen}
        breadcrumbItems={[
          { label: 'Dashboard', href: '/home' },
          { label: '10X Challenges', current: true },
        ]}
      />

      <div className="flex flex-col gap-6 mt-6 3xl:mt-8 4xl:mt-10">
        <h1 className="text-white text-h1 font-normal">10X Challenges</h1>

        {/* Tabs + Actions Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="w-md">
            <ModeToggle
              options={['My Challenges', 'Leaderboard', 'Tiers']}
              activeIndex={activeTab}
              onChange={setActiveTab}
            />
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <SearchInput placeholder="Search for" />
            <button className="h-11 w-[2.9375rem] rounded-full border border-[#303030] bg-transparent flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors shrink-0" aria-label="Filter">
              <FilterIcon />
            </button>
            <SparkleButton className="px-10" onClick={() => setPrizePoolOpen(true)}>
              <PrizePoolTrophyIcon />
              <span>Prize Pool</span>
            </SparkleButton>
            <GlowButton label="New Account" width={192} height={44} fontSize={16} icon={<NewAccountUserIconDark />} />
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 0 && <MyChallengesContent onCreateAccount={() => setStartChallengeOpen(true)} />}
        {activeTab === 1 && <LeaderboardContent />}
        {activeTab === 2 && <TiersContent onPurchase={() => setStartChallengeOpen(true)} />}
      </div>

      <PrizePoolModal open={prizePoolOpen} onClose={() => setPrizePoolOpen(false)} />
      <StartChallengeModal open={startChallengeOpen} onClose={() => setStartChallengeOpen(false)} />
    </div>
  )
}
