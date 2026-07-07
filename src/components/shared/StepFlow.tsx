import { ChevronDownIcon } from '@/components/icons'

export function StepCircle({ stepNumber, status }: { stepNumber: number; status: 'completed' | 'active' | 'inactive' }) {
  if (status === 'inactive') {
    return (
      <div className="w-10 h-10 3xl:w-14 3xl:h-14 4xl:w-18 4xl:h-18 rounded-full bg-[#404040] flex items-center justify-center">
        <span className="text-[#a0a0a0] text-[1rem] 3xl:text-[1.25rem] 4xl:text-[1.75rem] font-medium">{stepNumber}</span>
      </div>
    )
  }

  return (
    <div className="w-10 h-10 3xl:w-14 3xl:h-14 4xl:w-18 4xl:h-18 rounded-full bg-white flex items-center justify-center shadow-[0px_4px_15.7px_5px_rgba(255,255,255,0.25)]">
      {status === 'completed' ? (
        <svg className="w-[0.625rem] h-[0.4375rem] 3xl:w-[0.875rem] 3xl:h-[0.625rem] 4xl:w-[1.125rem] 4xl:h-[0.8125rem]" viewBox="0 0 10 7" fill="none" aria-hidden="true">
          <path d="M1 3.5L3.5 6L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <span className="text-black text-[1rem] 3xl:text-[1.25rem] 4xl:text-[1.75rem] font-medium">{stepNumber}</span>
      )}
    </div>
  )
}

export function StepConnector({ status }: { status: 'completed' | 'inactive' }) {
  return <div className={`flex-1 w-px mt-3 mb-1 ${status === 'completed' ? 'bg-white' : 'bg-[#404040]'}`} />
}

export function FaqTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-3 py-[0.3125rem] rounded-[3.75rem] border border-[#3d3d3d] bg-[linear-gradient(38deg,#1e1e1e_24%,#3f4341_128%)] text-[0.75rem] 3xl:text-[1rem] 4xl:text-[1.25rem] text-[#bebebe] leading-[1.25rem] 3xl:leading-[1.5rem] 4xl:leading-[1.75rem]">
      {label}
    </span>
  )
}

interface FaqItem {
  question: string
  tag: string
  answer: string
}

interface FaqSectionProps {
  faqs: FaqItem[]
  expandedFaq: number | null
  onToggle: (index: number) => void
}

export function FaqSection({ faqs, expandedFaq, onToggle }: FaqSectionProps) {
  return (
    <div className="w-full xl:basis-1/2 xl:min-w-0">
      <h2 className="text-[1.5rem] font-normal mb-6 leading-[1.875rem]">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-[1.875rem] border border-[#00422c] px-8 py-7"
          >
            <div className="flex items-center justify-between gap-6">
              <span className="text-[1.125rem] 3xl:text-[1.5rem] 4xl:text-[2rem] text-white font-normal leading-[1.406rem] 3xl:leading-[1.875rem] 4xl:leading-[2.5rem]">{faq.question}</span>
              <button
                type="button"
                onClick={() => onToggle(i)}
                className={`w-11 h-11 rounded-[0.9375rem] bg-gradient-to-b from-[#011b12] to-[#08291e] flex items-center justify-center shrink-0 cursor-pointer transition-transform duration-300 ease-in-out ${expandedFaq === i ? 'rotate-180' : ''}`}
                aria-expanded={expandedFaq === i}
              >
                <ChevronDownIcon size={14} color="#00f0a0" />
              </button>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <FaqTag label={faq.tag} />
            </div>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${expandedFaq === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="pt-4 text-gfx-neutral-300 text-[0.9375rem] leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
