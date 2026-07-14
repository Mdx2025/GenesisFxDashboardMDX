import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton, WaveText } from '@/components/ui'
import { EyeIcon } from '@/components/icons'
import { AuthCardLayout } from '@/components/auth/AuthCard'
import { useFadeIn } from '@/hooks/useFadeIn'

const INPUT_CLASS = "w-full h-[2.875rem] rounded-[1.875rem] bg-[#0c1311] border border-[#064b34] px-[1.625rem] text-white text-base placeholder:text-[#808080] outline-none focus:border-gfx-green-500/50 transition-colors"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const fadeRef = useFadeIn()

  const isValid = newPassword.trim() !== '' && confirmPassword.trim() !== ''

  return (
    <AuthCardLayout>
      <div ref={fadeRef} className="w-full max-w-[34.125rem] px-4 sm:px-0 flex flex-col items-center gap-[2.6875rem]">
        <WaveText as="h1" className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-[1.17] text-center">
          Reset Your Password
        </WaveText>

        <form className="w-full flex flex-col gap-[1.125rem]" onSubmit={e => e.preventDefault()}>
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
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
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
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              <EyeIcon open={showConfirm} />
            </button>
          </div>

          <div className="w-full pt-2">
            <GlowButton label="Confirm" width="100%" disabled={!isValid} />
          </div>
        </form>

        <p className="text-base leading-[1.2]">
          <span className="text-[#808080]">Back to </span>
          <Link to="/" className="text-white font-medium hover:underline">Sign In</Link>
        </p>
      </div>
    </AuthCardLayout>
  )
}
