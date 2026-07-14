import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton } from '@/components/ui'
import { GlowEllipse } from '@/components/ui/GlowEllipse'
import { useFadeIn } from '@/hooks/useFadeIn'

function MailIcon() {
  return (
    <svg width="62" height="62" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 8.5c0-2.121 0-3.182.659-3.841C3.318 4 4.379 4 6.5 4h11c2.121 0 3.182 0 3.841.659C22 5.318 22 6.379 22 8.5v4c0 2.121 0 3.182-.659 3.841C20.682 17 19.621 17 17.5 17h-11c-2.121 0-3.182 0-3.841-.659C2 15.682 2 14.621 2 12.5v-4z" fill="#10BC83" opacity="0.3" />
      <path d="M2 8.5c0-2.121 0-3.182.659-3.841C3.318 4 4.379 4 6.5 4h11c2.121 0 3.182 0 3.841.659C22 5.318 22 6.379 22 8.5v4c0 2.121 0 3.182-.659 3.841C20.682 17 19.621 17 17.5 17h-11c-2.121 0-3.182 0-3.841-.659C2 15.682 2 14.621 2 12.5v-4z" stroke="#10BC83" strokeWidth="1.5" />
      <path d="M6 8l4.058 2.845a3 3 0 003.484.105L18 8" stroke="#10BC83" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="19" cy="5" r="3.5" fill="#10BC83" stroke="#000705" strokeWidth="1" />
    </svg>
  )
}

const INPUT_CLASS = "w-full h-[2.875rem] rounded-[1.875rem] bg-gfx-green-800 border border-gfx-green-200 px-[1.625rem] text-white text-base placeholder:text-gfx-neutral-400 outline-none focus:border-gfx-green-500/50 transition-colors font-acid"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gfx-sidebar font-acid relative overflow-hidden flex items-center justify-center">
      {/* Page glow — top right */}
      <div className="absolute w-[43.6875rem] h-[43.6875rem] -top-[19.4375rem] -right-[41.75rem] rounded-full bg-gfx-green-200 pointer-events-none" style={{ filter: 'blur(25.375rem)' }} aria-hidden="true" />

      {/* Card — Frame 2085662595 */}
      <div className="relative w-full max-w-3xl h-[90vh] rounded-[3rem] overflow-hidden flex flex-col">
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
        <div className="flex-1 flex flex-col justify-center items-center relative z-10">
          {step === 1 ? (
            <EmailStep email={email} setEmail={setEmail} onSubmit={() => { if (email.trim()) setStep(2) }} />
          ) : (
            <ConfirmationStep />
          )}
        </div>

        {/* Footer inside card */}
        <p className="relative z-10 text-gfx-neutral-400 text-xs text-center pb-[2rem] leading-[1.175rem]">
          2026 Genesis FX Markets. All rights reserved.
        </p>
      </div>
    </div>
  )
}

function EmailStep({ email, setEmail, onSubmit }: {
  email: string
  setEmail: (v: string) => void
  onSubmit: () => void
}) {
  const fadeRef = useFadeIn()

  return (
    <div ref={fadeRef} className="flex flex-col items-center px-6 sm:px-0 w-full">
      <h1 className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-none text-center">
        Reset Your Password
      </h1>

      <p className="text-gfx-neutral-400 text-sm leading-[1.175rem] text-center max-w-[21.5rem] mt-[1.5625rem]">
        Enter your email address and we&apos;ll send you a link to reset your password.
      </p>

      <div className="w-full max-w-[34.125rem] mt-[3.8125rem]">
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-label="Email address"
          className={INPUT_CLASS}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>

      <div className="w-full max-w-[34.125rem] mt-[1.625rem]">
        <GlowButton label="Send Reset Link" width="100%" disabled={!email.trim()} onClick={onSubmit} />
      </div>

      <p className="text-base leading-[1.2] mt-[2.4375rem]">
        <span className="text-gfx-neutral-400">Back to </span>
        <Link to="/" className="text-white font-medium hover:underline">Sign In</Link>
      </p>
    </div>
  )
}

function ConfirmationStep() {
  const fadeRef = useFadeIn()

  return (
    <div ref={fadeRef} className="flex flex-col items-center px-6 sm:px-0 w-full">
      <div className="w-[3.875rem] h-[3.875rem] flex items-center justify-center">
        <MailIcon />
      </div>

      <h1 className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-none text-center mt-[1.1875rem]">
        Confirmed Request
      </h1>

      <p className="text-gfx-neutral-400 text-sm leading-[1.175rem] text-center max-w-[21.5rem] mt-[2.1875rem]">
        If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.
      </p>
    </div>
  )
}
