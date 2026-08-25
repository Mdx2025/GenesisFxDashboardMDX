import { forwardRef, type CSSProperties, type ReactNode } from 'react'

interface InternalTransferModalFrameProps {
  title: string
  description: string
  labelId?: string
  onClose: () => void
  children: ReactNode
  className?: string
  contentClassName?: string
  descriptionClassName?: string
  descriptionWidthClassName?: string
  style?: CSSProperties
}

export const InternalTransferModalFrame = forwardRef<HTMLDivElement, InternalTransferModalFrameProps>(
  function InternalTransferModalFrame(
    { title, description, labelId, onClose, children, className = '', contentClassName = 'px-[78px] pb-[54px] pt-8', descriptionClassName = 'text-caption', descriptionWidthClassName = 'max-w-[352px]', style },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={`relative w-[793px] max-w-[95vw] rounded-2xl bg-gfx-main ${className}`}
        style={style}
        data-internal-transfer-modal-frame
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden clip-radius rounded-2xl border border-gfx-green-200 bg-gfx-main backdrop-blur-[23.23px]"
          aria-hidden="true"
        >
          <div className="theme-decorative-glow absolute left-[190px] top-[682px] h-[278px] w-[493px] rounded-full bg-gfx-green-175 blur-[157px]" />
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-7 top-7 z-20 grid size-6 cursor-pointer place-items-center text-white transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gfx-green-500"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative z-10 px-16 pt-8 text-center sm:px-12 sm:pt-[63px]">
          <h2 id={labelId} className="font-acid text-[28px] font-normal leading-none text-white sm:text-[36px]">
            {title}
          </h2>
          <p className={`mx-auto mt-1 font-acid font-medium leading-snug text-gfx-neutral-500 ${descriptionWidthClassName} ${descriptionClassName}`}>
            {description}
          </p>
        </div>

        <div className="relative mx-auto mb-5 mt-5 w-[701px] max-w-[90%] sm:mb-[46px] sm:mt-9" data-internal-transfer-modal-card>
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden clip-radius rounded-xl bg-gfx-card-bg shadow-[0px_1.25px_0px_1.25px_rgba(255,255,255,0.04)_inset,0px_5.01px_25.07px_rgba(0,0,0,0.20)] outline outline-1 outline-offset-[-1.25px] outline-gfx-card-border backdrop-blur-[25px]"
            aria-hidden="true"
          >
            <div className="theme-decorative-glow absolute left-[304px] top-[-333px] h-[435px] w-[587px] origin-top-left rotate-[48deg] rounded-full bg-gfx-green-50 blur-[157px]" />
            <div className="theme-decorative-glow absolute left-9 top-[-28px] h-[278px] w-[493px] rounded-full bg-gfx-green-175 blur-[157px]" />
            <div className="theme-decorative-glow absolute left-[555px] top-[-75px] h-[237px] w-[237px] rounded-full bg-gfx-green-175 opacity-30 mix-blend-color blur-[87px]" />
          </div>

          <div className={`relative z-10 ${contentClassName}`}>{children}</div>
        </div>
      </div>
    )
  },
)
