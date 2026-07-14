import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton } from '@/components/ui'
import { GlowEllipse } from '@/components/ui/GlowEllipse'
import { EyeIcon } from '@/components/icons'
import { useFadeIn } from '@/hooks/useFadeIn'

const INPUT_CLASS = "w-full h-[2.875rem] rounded-[1.875rem] bg-gfx-green-800 border border-gfx-green-200 px-[1.625rem] text-white text-base placeholder:text-gfx-neutral-400 outline-none focus:border-gfx-green-500/50 transition-colors font-acid"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const fadeRef = useFadeIn()

  const isValid = newPassword.trim() !== '' && confirmPassword.trim() !== ''

  return (
    <div className="min-h-screen bg-gfx-sidebar font-acid relative overflow-hidden flex items-center justify-center">
      {/* Page glow — top right */}
      <div className="absolute w-[43.6875rem] h-[43.6875rem] -top-[19.4375rem] -right-[41.75rem] rounded-full bg-gfx-green-200 pointer-events-none" style={{ filter: 'blur(25.375rem)' }} aria-hidden="true" />

      {/* Card — Frame 2085662595 */}
      <div className="relative w-[51.125rem] max-w-[calc(100%-2rem)] h-[90vh] rounded-[3rem] overflow-hidden flex flex-col">
        {/* GlowEllipse — top right corner */}
        <GlowEllipse className="-top-[6.25rem] -right-[10rem] scale-[1.8]" />
        {/* GlowEllipse — bottom left corner */}
        <GlowEllipse className="-bottom-[6.25rem] -left-[10rem] scale-[1.8]" />

        {/* Pixel texture — top right corner only */}
        <div
          className="absolute -top-[2rem] -right-[2rem] w-[20.75rem] h-[14.875rem] opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/pixels.png)',
            backgroundSize: '37.5rem',
            backgroundPosition: 'top left',
          }}
          aria-hidden="true"
        />
        {/* Pixel texture — bottom left corner only */}
        <div
          className="absolute -bottom-[2rem] -left-[2rem] w-[20.75rem] h-[14.875rem] opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/pixels.png)',
            backgroundSize: '37.5rem',
            backgroundPosition: 'bottom right',
          }}
          aria-hidden="true"
        />

        {/* Logo — top center */}
        <div className="relative flex justify-center pt-[3rem] z-10">
          <img src="/images/genesis-logo.png" alt="Genesis FX" className="h-[2.8125rem] w-auto" />
        </div>

        {/* Centered content */}
        <div ref={fadeRef} className="flex-1 flex flex-col justify-center items-center relative z-10 px-6 sm:px-0">
          <h1 className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-none text-center">
            Reset Your Password
          </h1>

          <div className="w-full max-w-[34.125rem] mt-[5.625rem] flex flex-col gap-[1.125rem]">
            <div className="w-full relative">
              <input
                type={showNew ? 'text' : 'password'}
                placeholder="New Password"
                autoComplete="new-password"
                aria-label="New password"
                className={`${INPUT_CLASS} pr-[3.25rem]`}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNew(v => !v)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                aria-label={showNew ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showNew} />
              </button>
            </div>

            <div className="w-full relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Repeat Password"
                autoComplete="new-password"
                aria-label="Repeat password"
                className={`${INPUT_CLASS} pr-[3.25rem]`}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>
          </div>

          <div className="w-full max-w-[34.125rem] mt-[1.625rem]">
            <GlowButton label="Confirm" width="100%" disabled={!isValid} />
          </div>

          <p className="text-base leading-[1.2] mt-[2.4375rem]">
            <span className="text-gfx-neutral-400">Back to </span>
            <Link to="/" className="text-white font-medium hover:underline">Sign In</Link>
          </p>
        </div>

        {/* Footer inside card */}
        <p className="relative z-10 text-gfx-neutral-400 text-xs text-center pb-[2rem] leading-[1.175rem]">
          2026 Genesis FX Markets. All rights reserved.
        </p>
      </div>
    </div>
  )
}
