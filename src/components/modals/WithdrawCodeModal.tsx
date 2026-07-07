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
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-250"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        role="presentation"
      />

      <div
        className="relative w-[793px] max-w-[95vw] max-h-[90vh] bg-[#0a0a0a] rounded-[40px] border border-[#064B34] shadow-[0px_9px_37px_0px_rgba(0,0,0,0.30)] backdrop-blur-xl overflow-hidden"
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

        <div className="flex justify-center pt-6 sm:pt-10 pb-2 sm:pb-4">
          <img
            src="/images/withdraw-security.svg"
            alt=""
            aria-hidden="true"
            className="w-auto max-h-[120px] sm:max-h-[200px] object-contain"
          />
        </div>

        <h2 className="text-center text-white text-[clamp(1.75rem,5vw,3rem)] font-normal font-acid leading-none">
          Enter your code
        </h2>

        <div className="text-center mt-3 sm:mt-4 px-6">
          <p className="text-gfx-neutral-300 text-[14px] sm:text-[16px] leading-6">
            We sent a 4-digit code to your email
          </p>
          <p className="text-gfx-neutral-300 text-[14px] sm:text-[16px] leading-6">
            Enter it below to confirm your withdrawal
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-10 px-4 sm:px-8">
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
              className={`w-[clamp(3.5rem,15vw,7rem)] h-[clamp(4rem,17vw,8rem)] rounded-xl sm:rounded-2xl border text-center text-white text-[clamp(1.5rem,5vw,3rem)] font-normal font-acid bg-transparent outline-none transition-colors focus:border-gfx-green-500 ${
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
          <p className="text-center text-red-500 text-[14px] mt-4 animate-[fadeInStep_0.3s_ease-out]">
            Invalid code. Please try again.
          </p>
        )}

        <div className="flex items-center justify-center gap-1 mt-8 sm:mt-16 pb-10 sm:pb-20">
          <span className="text-gfx-neutral-300 text-[16px] leading-6">
            Didn't receive the code?
          </span>
          <button className="text-white text-[16px] leading-6 hover:underline cursor-pointer">
            Resend
          </button>
        </div>

        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-80px] w-[493px] h-72 bg-green-900 rounded-full pointer-events-none"
          style={{ filter: 'blur(157px)' }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
