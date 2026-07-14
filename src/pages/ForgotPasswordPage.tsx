import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton, WaveText } from '@/components/ui'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { useFadeIn } from '@/hooks/useFadeIn'

function MailIcon() {
  return (
    <svg width="62" height="62" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 8.5c0-2.121 0-3.182.659-3.841C3.318 4 4.379 4 6.5 4h11c2.121 0 3.182 0 3.841.659C22 5.318 22 6.379 22 8.5v4c0 2.121 0 3.182-.659 3.841C20.682 17 19.621 17 17.5 17h-11c-2.121 0-3.182 0-3.841-.659C2 15.682 2 14.621 2 12.5v-4z"
        fill="#10BC83"
        opacity="0.3"
      />
      <path
        d="M2 8.5c0-2.121 0-3.182.659-3.841C3.318 4 4.379 4 6.5 4h11c2.121 0 3.182 0 3.841.659C22 5.318 22 6.379 22 8.5v4c0 2.121 0 3.182-.659 3.841C20.682 17 19.621 17 17.5 17h-11c-2.121 0-3.182 0-3.841-.659C2 15.682 2 14.621 2 12.5v-4z"
        stroke="#10BC83"
        strokeWidth="1.5"
      />
      <path
        d="M6 8l4.058 2.845a3 3 0 003.484.105L18 8"
        stroke="#10BC83"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="19" cy="5" r="3.5" fill="#10BC83" stroke="#000705" strokeWidth="1" />
    </svg>
  )
}

const INPUT_CLASS = "w-full h-[2.875rem] rounded-[1.875rem] bg-[#0c1311] border border-[#064b34] px-[1.625rem] text-white text-base placeholder:text-[#808080] outline-none focus:border-gfx-green-500/50 transition-colors"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setStep(2)
  }

  return (
    <AuthLayout>
      {step === 1 ? (
        <EmailStep email={email} setEmail={setEmail} onSubmit={handleSubmit} />
      ) : (
        <ConfirmationStep />
      )}
    </AuthLayout>
  )
}

function EmailStep({ email, setEmail, onSubmit }: {
  email: string
  setEmail: (v: string) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  const fadeRef = useFadeIn()

  return (
    <div ref={fadeRef} className="w-full max-w-[34.125rem] px-4 sm:px-0 flex flex-col items-center gap-[2.6875rem]">
      <div className="flex flex-col items-center gap-[1.375rem]">
        <WaveText as="h1" className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-[1.17] text-center">
          Reset Your Password
        </WaveText>
        <WaveText as="p" className="text-[#808080] text-sm leading-[1.34] text-center max-w-[21.5rem]" delay={0.4} stagger={0.015}>
          Enter your email address and we'll send you a link to reset your password.
        </WaveText>
      </div>

      <form className="w-full flex flex-col gap-[1.125rem]" onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-label="Email address"
          className={INPUT_CLASS}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div className="w-full pt-2">
          <GlowButton label="Send Reset Link" width="100%" disabled={!email.trim()} onClick={() => { if (email.trim()) onSubmit(new Event('submit') as unknown as React.FormEvent) }} />
        </div>
      </form>

      <p className="text-base leading-[1.2]">
        <span className="text-[#808080]">Back to </span>
        <Link to="/" className="text-white font-medium hover:underline">Sign In</Link>
      </p>
    </div>
  )
}

function ConfirmationStep() {
  const fadeRef = useFadeIn()

  return (
    <div ref={fadeRef} className="w-full max-w-[34.125rem] px-4 sm:px-0 flex flex-col items-center gap-[1.375rem]">
      <div className="w-[3.875rem] h-[3.875rem] flex items-center justify-center">
        <MailIcon />
      </div>

      <WaveText as="h1" className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-[1.17] text-center">
        Confirmed Request
      </WaveText>

      <WaveText as="p" className="text-[#808080] text-sm leading-[1.34] text-center max-w-[21.5rem]" delay={0.4} stagger={0.015}>
        If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.
      </WaveText>
    </div>
  )
}
