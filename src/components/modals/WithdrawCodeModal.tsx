import { useState, useRef, useEffect } from 'react'

interface WithdrawCodeModalProps {
  open: boolean
  onClose: () => void
}

export function WithdrawCodeModal({ open, onClose }: WithdrawCodeModalProps) {
  const [code, setCode] = useState(['', '', '', ''])
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (open) {
      setMounted(true)
      setCode(['', '', '', ''])
      requestAnimationFrame(() => setVisible(true))
      setTimeout(() => inputRefs.current[0]?.focus(), 200)
    } else if (mounted) {
      setVisible(false)
      const t = setTimeout(() => setMounted(false), 250)
      return () => clearTimeout(t)
    }
  }, [open])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const digit = value.slice(-1)
    const newCode = [...code]
    newCode[index] = digit
    setCode(newCode)
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    const newCode = [...code]
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i]
    }
    setCode(newCode)
    const focusIndex = Math.min(pasted.length, 3)
    inputRefs.current[focusIndex]?.focus()
  }

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
        {/* Close button */}
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

        {/* Security illustration */}
        <div className="flex justify-center pt-16 pb-6">
          <img
            src="/images/withdraw-security.svg"
            alt=""
            aria-hidden="true"
            className="w-auto max-h-[160px]"
          />
        </div>

        {/* Title */}
        <h2 className="text-center text-white text-[48px] font-normal font-acid leading-none">
          Enter your code
        </h2>

        {/* Subtitle */}
        <div className="text-center mt-4">
          <p className="text-gfx-neutral-300 text-[16px] leading-6">
            We sent a 4-digit code to your email
          </p>
          <p className="text-gfx-neutral-300 text-[16px] leading-6">
            Enter it below to confirm your withdrawal
          </p>
        </div>

        {/* Code inputs */}
        <div className="flex items-center justify-center gap-3 mt-10 px-8">
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
              className={`w-28 h-32 rounded-2xl border text-center text-white text-[48px] font-normal font-acid bg-transparent outline-none transition-colors focus:border-gfx-green-500 ${
                digit ? 'border-gfx-green-500' : 'border-[#3d3d3d]'
              }`}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        {/* Resend */}
        <div className="flex items-center justify-center gap-1 mt-16 pb-20">
          <span className="text-gfx-neutral-300 text-[16px] leading-6">
            Didn't receive the code?
          </span>
          <button className="text-white text-[16px] leading-6 hover:underline cursor-pointer">
            Resend
          </button>
        </div>

        {/* Bottom glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-[-80px] w-[493px] h-72 bg-green-900 rounded-full pointer-events-none"
          style={{ filter: 'blur(157px)' }}
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
