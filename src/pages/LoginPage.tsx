import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton, WaveText } from '@/components/ui'
import { EyeIcon } from '@/components/icons'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { useFadeIn } from '@/hooks/useFadeIn'

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

const INPUT_CLASS = "w-full h-[2.875rem] rounded-3xl bg-gfx-green-800 border border-gfx-green-200 px-[1.625rem] text-white text-base placeholder:text-gfx-neutral-400 outline-none focus:border-gfx-green-500/50 transition-colors"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const fadeRef = useFadeIn()

  return (
    <AuthLayout>
      <div ref={fadeRef} className="w-full max-w-[34.125rem] px-4 sm:px-0 flex flex-col items-center gap-[2.6875rem]">
        <div className="flex flex-col items-center gap-[2.6875rem]">
          <WaveText as="h1" className="text-white text-[clamp(2rem,5vw,3.125rem)] font-normal leading-tight text-center">Trader's Room Log In</WaveText>
          <WaveText as="p" className="text-gfx-neutral-500 text-sm leading-[1.175rem] text-center" delay={0.4} stagger={0.015}>Welcome back! Sign in to your account below.</WaveText>
        </div>

        <div className="w-full flex flex-col items-center gap-7">
          <button
            type="button"
            className="w-full h-12 rounded-2xl border border-gfx-neutral-200 bg-transparent flex items-center justify-center gap-4 cursor-pointer hover:border-[#404040] transition-colors"
            aria-label="Sign in with Google"
          >
            <GoogleIcon />
            <span className="text-white text-sm leading-[1.175rem]">Sign In with Google</span>
          </button>

          <div className="w-full flex items-center" role="separator">
            <div className="flex-1 h-px bg-gfx-green-900" />
            <span className="text-white text-sm leading-[1.175rem] px-6">Or</span>
            <div className="flex-1 h-px bg-gfx-green-900" />
          </div>
        </div>

        <form className="w-full flex flex-col gap-4.5" onSubmit={e => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            aria-label="Email address"
            className={INPUT_CLASS}
          />

          <div className="w-full relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="current-password"
              aria-label="Password"
              className={`${INPUT_CLASS} pr-13`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gfx-neutral-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>

          <div className="w-full pt-2">
            <GlowButton label="Sign In" width="100%" />
          </div>
        </form>

        <div className="flex flex-col items-center gap-5">
          <Link to="/forgot-password" className="text-gfx-green-300 text-base leading-tight hover:underline">
            Forgot Password?
          </Link>

          <p className="text-base leading-tight">
            <span className="text-gfx-neutral-400">New to Genesis? </span>
            <Link to="/register" className="text-white hover:underline">Register Now</Link>
          </p>

          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-2 h-[2.125rem] px-3.5 rounded-2xl border border-gfx-neutral-200">
              <div className="w-[0.4375rem] h-[0.4375rem] rounded-full bg-gfx-green-300" aria-hidden="true" />
              <span className="text-white text-sm leading-[1.175rem]">Live</span>
            </div>
            <div className="flex items-center gap-2 h-[2.125rem] px-3.5 rounded-2xl border border-gfx-neutral-200">
              <div className="w-[0.4375rem] h-[0.4375rem] rounded-full bg-[#9a4dff]" aria-hidden="true" />
              <span className="text-white text-sm leading-[1.175rem]">Demo</span>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
