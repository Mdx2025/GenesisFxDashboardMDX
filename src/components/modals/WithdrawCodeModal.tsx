import { useState, useRef, useEffect, useCallback } from 'react'

interface WithdrawCodeModalProps {
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

const VALID_CODE = '0000'

export function WithdrawCodeModal({ open, onClose, onSuccess }: WithdrawCodeModalProps) {
  const [code, setCode] = useState(['', '', '', ''])
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const codeRef = useRef(['', '', '', ''])

  useEffect(() => {
    if (open) {
      setMounted(true)
      const empty = ['', '', '', '']
      setCode(empty)
      codeRef.current = [...empty]
      setError(false)
      requestAnimationFrame(() => setVisible(true))
      setTimeout(() => inputRefs.current[0]?.focus(), 200)
    } else if (mounted) {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 250)
      return () => clearTimeout(t)
    }
  }, [open])

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const digit = value.slice(-1)

    codeRef.current[index] = digit
    const snapshot = [...codeRef.current]
    setCode(snapshot)
    setError(false)

    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }

    if (digit) {
      const full = snapshot.join('')
      if (full.length === 4) {
        if (full === VALID_CODE) {
          setError(false)
          setTimeout(() => {
            onClose()
            onSuccess?.()
          }, 150)
        } else {
          setError(true)
        }
      }
    }
  }, [onClose, onSuccess])

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeRef.current[index] && index > 0) {
      codeRef.current[index - 1] = ''
      setCode([...codeRef.current])
      setError(false)
      inputRefs.current[index - 1]?.focus()
    }
  }, [])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    for (let i = 0; i < 4; i++) {
      codeRef.current[i] = pasted[i] || ''
    }
    const snapshot = [...codeRef.current]
    setCode(snapshot)
    setError(false)
    const focusIndex = Math.min(pasted.length, 3)
    inputRefs.current[focusIndex]?.focus()

    if (pasted.length === 4) {
      const full = snapshot.join('')
      if (full === VALID_CODE) {
        setTimeout(() => {
          onClose()
          onSuccess?.()
        }, 150)
      } else {
        setError(true)
      }
    }
  }, [onClose, onSuccess])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 z-sticky flex items-center justify-center transition-opacity duration-250"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      <div
        className="relative w-[49.5625rem] max-w-[95vw] max-h-[90vh] bg-[#0a0a0a] rounded-2xl glass-card shadow-[0px_9px_37px_0px_rgba(0,0,0,0.30)] backdrop-blur-xl overflow-hidden"
        style={{
          animation: visible
            ? 'modalFadeIn 0.3s ease-out forwards'
            : 'modalFadeOut 0.25s ease-in forwards',
        }}
      >
        <button
          onClick={onClose}
          className="absolute right-7 top-7 z-10 cursor-pointer hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="relative flex justify-center pt-6 sm:pt-10 pb-2 sm:pb-4">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            <defs>
              <filter id="ellipse-blur">
                <feGaussianBlur stdDeviation="111.635" />
              </filter>
            </defs>
            <ellipse cx="50%" cy="50%" rx="40%" ry="45%" fill="#0D4532" opacity="0.3" style={{ mixBlendMode: 'color' }} filter="url(#ellipse-blur)" />
          </svg>
          <img
            src="/images/withdraw-security-icon.png"
            alt=""
            aria-hidden="true"
            className="relative z-10 w-auto max-h-[120px] sm:max-h-[200px] object-contain"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-center text-white text-h1 font-normal font-acid leading-none">
              Enter your code
            </h2>

            <div className="text-center px-6">
              <p className="text-gfx-neutral-500 text-sm sm:text-base leading-6">
                We sent a 4-digit code to your email
              </p>
              <p className="text-gfx-neutral-500 text-sm sm:text-base leading-6">
                Enter it below to confirm your withdrawal
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-8">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={el => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                onPaste={i === 0 ? handlePaste : undefined}
                className={`w-[clamp(3.5rem,15vw,7rem)] h-[clamp(4rem,17vw,8rem)] rounded-xl sm:rounded-2xl border text-center text-white text-h2 font-normal font-acid bg-transparent outline-none transition-colors focus:border-gfx-green-500 ${
                  error
                    ? 'border-red-500'
                    : digit
                      ? 'border-gfx-green-500'
                      : 'border-[#3d3d3d]'
                }`}
                aria-label={`Digit ${i + 1}`}
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-red-500 text-sm animate-[fadeInStep_0.3s_ease-out]">
              Invalid code. Please try again.
            </p>
          )}

          <div className="flex items-center justify-center gap-1 pb-10 sm:pb-20">
            <span className="text-gfx-neutral-500 text-base leading-6">
              Didn't receive the code?
            </span>
            <button className="text-white text-base leading-6 hover:underline cursor-pointer">
              Resend
            </button>
          </div>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-30%] w-[30.8125rem] h-72 bg-green-900 rounded-full pointer-events-none [filter:url(#blur-157)]"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
