import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GlowButton } from '@/components/ui'

function GoogleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
        <path d="M10 0C5.45 0 1.57 2.91.07 7c1.5 4.09 5.38 7 9.93 7s8.43-2.91 9.93-7C18.43 2.91 14.55 0 10 0zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
      <path d="M10 3c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92A11.82 11.82 0 0 0 19.93 8C18.43 3.91 14.55 1 10 1c-1.27 0-2.49.2-3.64.57l2.17 2.17C9.08 3.27 9.52 3 10 3zM1 1.27l2.28 2.28.46.46A11.8 11.8 0 0 0 .07 8c1.5 4.09 5.38 7 9.93 7 1.55 0 3.03-.3 4.38-.84l.42.42L17.73 17l1.27-1.27L2.27 0 1 1.27zM6.53 6.8l1.55 1.55c-.05.21-.08.43-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2zm3.31-.78 3.15 3.15.02-.16a3 3 0 0 0-3-3l-.17.01z" fill="currentColor" />
    </svg>
  )
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="h-screen bg-[#000705] font-acid relative overflow-hidden">
      {/* Top-right ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 699, height: 699, top: -311, right: -668, background: '#064b34', filter: 'blur(406px)' }}
        aria-hidden="true"
      />

      <div className="flex h-full p-[3.125rem]">
        {/* Left: Hero Image */}
        <div className="relative w-[818px] h-full shrink-0 rounded-[48px] overflow-hidden">
          <img
            src="/images/login-hero.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Top glow */}
          <div
            className="absolute rounded-full pointer-events-none blur-[160px] opacity-40"
            style={{ width: 587, height: 332, top: -215, right: -270, background: '#00b38c' }}
          />

          {/* Bottom glow cluster */}
          <div
            className="absolute rounded-full pointer-events-none blur-[160px] opacity-40"
            style={{ width: 587, height: 332, bottom: -150, left: -150, background: '#00b38c' }}
          />
          <div
            className="absolute rounded-full pointer-events-none blur-[140px] opacity-30 mix-blend-plus-lighter"
            style={{ width: 295, height: 274, bottom: -100, left: -50, background: '#40c99c' }}
          />
          <div
            className="absolute rounded-full pointer-events-none blur-[150px] opacity-30 mix-blend-plus-lighter"
            style={{ width: 295, height: 274, bottom: -80, left: 0, background: '#40c99c' }}
          />

          {/* Genesis FX Logo */}
          <img
            src="/images/genesis-logo.png"
            alt="Genesis FX"
            className="absolute bottom-8 left-1/2 -translate-x-1/2 h-[2.8125rem] w-auto z-10"
          />
        </div>

        {/* Right: Login Form */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="w-[546px] flex flex-col items-center">
            <h1 className="text-white text-[3.125rem] font-normal leading-[1.17] text-center">
              Trader's Room Log In
            </h1>

            <p className="text-[#a0a0a0] text-[0.875rem] leading-[1.175rem] text-center mt-[2.6875rem]">
              Welcome back! Sign in to your account below.
            </p>

            {/* Google Sign-In */}
            <button
              type="button"
              className="w-full h-[3rem] rounded-[2rem] border border-[#2f2f2f] bg-transparent flex items-center justify-center gap-[1.0625rem] mt-[1.75rem] cursor-pointer hover:border-[#404040] transition-colors"
            >
              <GoogleIcon />
              <span className="text-white text-[0.875rem] leading-[1.175rem]">Sign In with Google</span>
            </button>

            {/* Or Divider */}
            <div className="w-full flex items-center mt-[2.6875rem]">
              <div className="flex-1 h-px bg-[#09241c]" />
              <span className="text-white text-[0.875rem] leading-[1.175rem] px-[1.625rem]">Or</span>
              <div className="flex-1 h-px bg-[#09241c]" />
            </div>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              className="w-full h-[2.875rem] rounded-[1.875rem] bg-[#0c1311] border border-[#064b34] px-[1.625rem] text-white text-[1rem] placeholder:text-[#808080] outline-none mt-[2.9375rem] focus:border-gfx-green-500/50 transition-colors"
            />

            {/* Password Input */}
            <div className="w-full relative mt-[1.125rem]">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full h-[2.875rem] rounded-[1.875rem] bg-[#0c1311] border border-[#064b34] px-[1.625rem] pr-[3.25rem] text-white text-[1rem] placeholder:text-[#808080] outline-none focus:border-gfx-green-500/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-[1.25rem] top-1/2 -translate-y-1/2 text-[#808080] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>

            {/* Sign In Button */}
            <div className="w-full mt-[1.6875rem]">
              <GlowButton label="Sign In" width="100%" />
            </div>

            {/* Forgot Password */}
            <Link
              to="/forgot-password"
              className="text-[#00b38c] text-[1rem] leading-[1.2] mt-[1.25rem] hover:underline"
            >
              Forgot Password?
            </Link>

            {/* Register */}
            <p className="text-[1rem] leading-[1.2] mt-[1.25rem]">
              <span className="text-[#808080]">New to Genesis? </span>
              <Link to="/register" className="text-white hover:underline">Register Now</Link>
            </p>

            {/* Live / Demo Badges */}
            <div className="flex items-center gap-[0.875rem] mt-[1.25rem]">
              <div className="flex items-center gap-[0.4375rem] h-[2.125rem] px-[0.875rem] rounded-[2rem] border border-[#2f2f2f]">
                <div className="w-[0.4375rem] h-[0.4375rem] rounded-full bg-[#00b38c]" />
                <span className="text-white text-[0.875rem] leading-[1.175rem]">Live</span>
              </div>
              <div className="flex items-center gap-[0.4375rem] h-[2.125rem] px-[0.875rem] rounded-[2rem] border border-[#2f2f2f]">
                <div className="w-[0.4375rem] h-[0.4375rem] rounded-full bg-[#9a4dff]" />
                <span className="text-white text-[0.875rem] leading-[1.175rem]">Demo</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="w-full absolute bottom-0 px-[1.5rem]">
            <div className="bg-[#0c1311] rounded-[0.75rem] px-[1.4375rem] py-[1rem] flex items-center gap-[2.5rem]">
              <span className="text-[#ececec] text-[0.75rem] leading-[1.175rem]">
                2026 Genesis FX Markets. All rights reserved.
              </span>
              <div className="flex items-center gap-[1.5rem]">
                <a href="#" className="text-[#a0a0a0] text-[0.75rem] leading-[1.175rem] hover:text-white transition-colors">Terms &amp; Conditions</a>
                <a href="#" className="text-[#a0a0a0] text-[0.75rem] leading-[1.175rem] hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-[#a0a0a0] text-[0.75rem] leading-[1.175rem] hover:text-white transition-colors">Risk Disclosure</a>
                <a href="#" className="text-[#a0a0a0] text-[0.75rem] leading-[1.175rem] hover:text-white transition-colors">Anti-Money Laundering</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
