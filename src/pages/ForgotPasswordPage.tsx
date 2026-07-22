import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton } from '@/components/ui'
import { GlowEllipse } from '@/components/ui/GlowEllipse'
import { useFadeIn } from '@/hooks/useFadeIn'

function MailIcon() {
  return (
    <svg width="40" height="36" viewBox="0 0 40 36" fill="none" aria-hidden="true">
      <path d="M40 6C40 9.31371 37.3137 12 34 12C30.6863 12 28 9.31371 28 6C28 2.68629 30.6863 0 34 0C37.3137 0 40 2.68629 40 6Z" fill="#00B38C" />
      <path fillRule="evenodd" clipRule="evenodd" d="M24 4H16C8.45753 4 4.68629 4 2.34315 6.34315C0 8.68629 0 12.4575 0 20C0 27.5425 0 31.3137 2.34315 33.6569C4.68629 36 8.45753 36 16 36H24C31.5425 36 35.3137 36 37.6569 33.6569C40 31.3137 40 27.5425 40 20C40 17.0933 40 14.7466 39.8659 12.826C38.2905 14.181 36.2409 15 34 15C33.0426 15 32.1202 14.8505 31.2547 14.5736L28.5673 16.8131C26.7946 18.2905 25.3578 19.4878 24.0896 20.3034C22.7687 21.1531 21.4822 21.6898 20 21.6898C18.5178 21.6898 17.2313 21.1531 15.9104 20.3034C14.6422 19.4878 13.2054 18.2905 11.4327 16.8132L7.03972 13.1523C6.40331 12.622 6.31732 11.6761 6.84767 11.0397C7.37801 10.4033 8.32386 10.3173 8.96028 10.8477L13.2781 14.4458C15.144 16.0008 16.4395 17.0768 17.5332 17.7803C18.5919 18.4612 19.3099 18.6898 20 18.6898C20.6901 18.6898 21.4081 18.4612 22.4668 17.7803C23.5605 17.0768 24.856 16.0008 26.7219 14.4458L28.4009 13.0467C26.3285 11.3979 25 8.85408 25 6C25 5.31276 25.077 4.6435 25.2229 4.0004C24.8267 4 24.4192 4 24 4Z" fill="#00B38C" />
    </svg>
  )
}

const INPUT_CLASS = "w-full h-[2.875rem] rounded-3xl bg-gfx-green-800 border border-gfx-green-200 px-6.5 text-white text-base placeholder:text-gfx-neutral-400 outline-none focus:border-gfx-green-500/50 transition-colors font-acid"

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-gfx-sidebar font-acid relative overflow-hidden flex items-center justify-center">
      {/* Page glow — top right */}
      <div className="absolute w-[43.6875rem] h-[43.6875rem] -top-[19.4375rem] -right-[41.75rem] rounded-full bg-gfx-green-200 pointer-events-none" style={{ filter: 'url(#blur-406)' }} aria-hidden="true" />

      {/* Card — Frame 2085662595 */}
      <div className="relative w-full max-w-3xl h-[90vh] rounded-2xl overflow-hidden flex flex-col">
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
        <div className="relative flex justify-center pt-12 z-10">
          <img src="/images/genesis-logo.png" alt="Genesis FX" className="h-11 w-auto" />
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
        <p className="relative z-10 text-gfx-neutral-400 text-xs text-center pb-8 leading-5">
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
      <h1 className="text-white text-hero font-normal leading-none text-center">
        Reset Your Password
      </h1>

      <p className="text-gfx-neutral-400 text-sm leading-5 text-center max-w-[21.5rem] mt-[1.5625rem]">
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

      <p className="text-base leading-tight mt-[2.4375rem]">
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

      <h1 className="text-white text-hero font-normal leading-none text-center mt-[1.1875rem]">
        Confirmed Request
      </h1>

      <p className="text-gfx-neutral-400 text-sm leading-5 text-center max-w-[21.5rem] mt-[2.1875rem]">
        If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.
      </p>
    </div>
  )
}
